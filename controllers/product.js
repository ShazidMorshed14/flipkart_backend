const slugify = require("slugify");

//importing the category model
const Product = require("../models/product");
const { generateUniqueCode } = require("../utils/utils");
const { uploadImagesToCloudinary } = require("../utils/file-upload-helper");

const MODEL_NAME = "Product";

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).populate({
      path: "createdBy",
      select: "_id name role",
    });

    return res.status(200).json({
      status: 200,
      message: `${MODEL_NAME} fetched successfully`,
      data: products,
    });
  } catch (error) {
    console.error(`Error fetching ${MODEL_NAME}:`, error);
    return res.status(500).json({ meassge: `Error fetching ${MODEL_NAME}` });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const productObj = {
      name: name,
      slug: slugify(name),
      sku: `${slugify(name)}-${generateUniqueCode()}`,
      price: price ? price : 0,
      description: description ? description : null,
      category: category,
      createdBy: req.user._id,
    };

    const isProductExists = await Product.findOne({ slug: slugify(name) });

    if (isProductExists)
      return res.status(409).json({
        status: 409,
        message: "Product Already Exists",
        data: null,
      });

    const productPicturesResponse = await uploadImagesToCloudinary(
      req,
      res,
      5,
      300
    );

    if (productPicturesResponse.status == 200) {
      productObj.productPictures = productPicturesResponse.data;
    } else if (productPicturesResponse.status == 409) {
      return res.status(409).json({
        status: 409,
        message: productPicturesResponse.message,
        data: null,
      });
    } else {
      return res.status(productPicturesResponse.status || 500).json({
        status: productPicturesResponse.status,
        message: productPicturesResponse.message,
        data: null,
      });
    }

    const newProduct = new Product(productObj);

    await newProduct
      .save()
      .then((productData) => {
        return res.status(200).json({
          status: 200,
          message: "Product Created successfully",
          data: productData,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(422).json({ message: err });
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllProduct, createProduct };
