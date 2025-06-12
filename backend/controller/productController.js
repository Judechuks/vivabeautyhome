import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

// 1. creating products
export const createProducts = async (req, res) => {
  const product = await productModel.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Product created successfully", product });
};

// 2. Get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const products = await productModel.find();
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});

// 3. Update a product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true, // to return the updated document not the old document
    runValidators: true, // to run validation on the updated document
  });
  if (!product) {
    return next(new HandleError("Product not found", 404)); // next allows to move to the next middleware, in this case the error handling middleware
  } else {
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  }
});

// 4. Delete product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
});

// 5. Get a product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id, {
    // new: true, // to return the updated document
    // runValidators: true, // to run validation on the updated document
  });
  if (!product) {
    return next(new HandleError("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  }
});
