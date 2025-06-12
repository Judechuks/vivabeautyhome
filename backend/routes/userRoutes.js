import express from "express";
import {
  registerUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  loginUser,
} from "../controller/userController.js";

const router = express.Router();

// Routes for user management
router.route("/register").post(registerUser); // Register a new user
router.route("/login").post(loginUser); // login user
router.route("/users").get(getAllUsers); // Get all users
router
  .route("/user/:id")
  .get(getSingleUser) // Get a single user by ID
  .put(updateUser) // Update user details
  .delete(deleteUser); // Delete a user

export default router;
