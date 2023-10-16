const slugify = require("slugify");

//importing the category model
const Category = require("../models/category");
const { generateUniqueCode } = require("../utils/utils");

const createCategoryTree = (categories, parentId = null) => {
  let categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter(
      (c) => c.parentId == null || c.parentId == undefined
    );
  } else {
    category = categories.filter((c) => c.parentId == parentId);
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      type: cat.type,
      categoryImage: cat.categoryImage,
      parentId: cat.parentId,
      //createdBy: cat.createdBy,
      children: createCategoryTree(categories, cat._id),
    });
  }

  return categoryList;
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).populate({
      path: "createdBy",
      select: "_id name role",
    });
    if (categories) {
      const categoryTree = createCategoryTree(categories);
      return res.status(200).json({
        status: 200,
        message: "Categories fetched successfully",
        data: categoryTree,
      });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ meassge: "Error fetching categories" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, type, categoryImage, parentId } = req.body;

    const checkCategory = await Category.findOne({ name: req.body.name });

    if (checkCategory) {
      return res.status(409).json({ message: "Same Category Already Exists!" });
    }

    const categoryObj = {
      name: name,
      slug: `${slugify(name)}-${generateUniqueCode()}`,
      type: type,
      categoryImage: categoryImage,
      parentId: parentId ? parentId : null,
      createdBy: req.user._id,
    };

    const newCat = new Category(categoryObj);

    await newCat
      .save()
      .then((categoryData) => {
        return res.status(200).json({
          status: 200,
          message: "Category Created successfully",
          data: categoryData,
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

module.exports = { createCategory, getAllCategory };
