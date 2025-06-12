import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// 1. creating products
export const createProducts = async (req, res) => {
  const product = await productModel.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "Product created successfully", product });
};

// 2. Get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultPerPage = 6; // number of products per page
  const apiFeatures = new APIFunctionality(productModel.find(), req.query)
    .search()
    .filter();

  // Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const totalProducts = await filteredQuery.countDocuments();

  // calculating total pages
  const totalPages = Math.ceil(totalProducts / resultPerPage);
  const page = Number(req.query.page) || 1; // current page, default is 1

  if (page > totalPages && totalProducts > 0) {
    return next(new HandleError("This page does not exist", 404));
  }

  // Applying pagination to the query
  apiFeatures.pagination(resultPerPage); // the number of products per page
  const products = await apiFeatures.query;
  if (!products || products.length === 0) {
    return next(new HandleError("No product found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
    totalProducts,
    resultPerPage,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages, // true if there is a next page
    hasPreviousPage: page > 1, // true if there is a previous page
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
