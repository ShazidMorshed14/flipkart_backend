const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    sku: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    offer: {
      type: Number,
    },
    productPictures: [{ _id: { type: String }, img: { type: String } }],
    reviews: [
      {
        userId: { type: ObjectId, ref: "User" },
        review: String,
      },
    ],
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
