import express from "express";
import {
  createProducts,
  createReviewForProduct,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getProductReviews,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
const router = express.Router();

// Routes
// app.get("/api/v1/products", getAllProducts);
// app.post("/api/v1/products", createProducts);
// alternatively
// general routes
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(verifyUserAuth, createReviewForProduct); // create & update review
router
  .route("/reviews")
  .get(getProductReviews) // get product reviews
  .delete(verifyUserAuth, deleteReview);

// admin routes
router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProducts);
router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

export default router;
