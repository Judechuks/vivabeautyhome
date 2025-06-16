import productModel from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// 1. creating products
export const createProducts = async (req, res) => {
  req.body.user = req.user.id;
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

// 6. Admin - Getting all the products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await productModel.find();
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
});

// 7. Creating and updating review
export const createReviewForProduct = handleAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await productModel.findById(productId);
    if (!product) {
      next(new HandleError("Product does not exist", 400));
    }
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString() // user that is logged in
    );
    console.log("reviewExists", reviewExists);

    if (reviewExists) {
      // edit the review if it already exists
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          review.rating = rating;
          review.comment = comment;
        }
      });
    } else {
      product.reviews.push(review); // add the review if it doesn't exist
    }
    product.numberOfReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    product.rating =
      product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      product,
    });
  }
);

// 8. Getting product reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Reviews fetched successfully",
    reviews: product.reviews,
  });
});

// 9. Deleting product review
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numberOfReviews = reviews.length;
  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
