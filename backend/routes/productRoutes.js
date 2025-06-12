import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/productController.js";
const router = express.Router();

// Routes
// app.get("/api/v1/products", getAllProducts);
// app.post("/api/v1/products", createProducts);
// alternatively
router.route("/products").get(getAllProducts).post(createProducts);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);

export default router;
