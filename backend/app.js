// const express = require("express");
import express from "express"; // to use this, add "type":"module" in the package.json
import productRoutes from "./routes/productRoutes.js";
const app = express(); // for defining routes and middleware

// endpoints with route handler (i.e the callback function)
/* app.get("/", (req, res) => {
  // req is the means that the frontend uses to pass data to the backend
  //res is the means the backend sends feedback and/or data back to the frontend
  res.status(200).json({ message: "All Products" });
  }); */

// Middleware to parse JSON bodies
app.use(express.json()); // to parse JSON data in the request body

// Route using middlewares
app.use("/api/v1", productRoutes);

export default app;
// module.exports = app;
