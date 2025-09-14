import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
// function for add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    // get the images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const image = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    // upload images to cloudinary
    let imagesUrl = await Promise.all(
      image.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // to save the data in mongodb
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "fail 4" });
  }
};

// function for list  products

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "fail 3" });
  }
};

// function for removing product

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, msg: "product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "fail 1" });
  }
};

// function for single product info

const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "fail 2" });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
