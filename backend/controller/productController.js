import productModel from "../models/productModel.js";

// 1. creating products
export const createProducts = async (req, res) => {
  const product = await productModel.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Product created successfully", product });
};

// 2. Get all products
export const getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
};

// 3. Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true, // to return the updated document not the old document
    runValidators: true, // to run validation on the updated document
  });
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  }
};

// 4. Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  } else {
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
};

// 5. Get a product
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findById(id, {
    // new: true, // to return the updated document
    // runValidators: true, // to run validation on the updated document
  });
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  }
};
