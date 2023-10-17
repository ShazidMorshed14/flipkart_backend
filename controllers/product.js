const slugify = require("slugify");

//importing the category model
const Product = require("../models/product");
const { generateUniqueCode } = require("../utils/utils");

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

// const createProduct = async (req, res) => {
//   try {
//     const { name, type, categoryImage, parentId } = req.body;

//     const checkCategory = await Category.findOne({ name: req.body.name });

//     if (checkCategory) {
//       return res.status(409).json({ message: "Same Category Already Exists!" });
//     }

//     const categoryObj = {
//       name: name,
//       slug: `${slugify(name)}-${generateUniqueCode()}`,
//       type: type,
//       categoryImage: categoryImage,
//       parentId: parentId ? parentId : null,
//       createdBy: req.user._id,
//     };

//     const newCat = new Category(categoryObj);

//     await newCat
//       .save()
//       .then((categoryData) => {
//         return res.status(200).json({
//           status: 200,
//           message: "Category Created successfully",
//           data: categoryData,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(422).json({ message: err });
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = { getAllProduct };
