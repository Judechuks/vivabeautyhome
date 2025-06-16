import express from "express";
import {
  registerUser,
  getSingleUser,
  loginUser,
  logout,
  requestPasswordReset,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getUsers,
  updateUserRole,
  deleteUser,
} from "../controller/userController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Routes for user management
router.route("/register").post(registerUser); // Register a new user
router.route("/login").post(loginUser); // login user
router.route("/logout").post(logout); // logout user
router.route("/password/forgot").post(requestPasswordReset); // send reset link to user
router.route("/reset/:token").post(resetPassword); // reset password for user
router.route("/profile").post(verifyUserAuth, getUserDetails); // verify user is logged in before request for their profile
router.route("/password/update").post(verifyUserAuth, updatePassword); // verify user is logged in before changing password
router.route("/profile/update").post(verifyUserAuth, updateProfile); // verify user is logged in before updating profile

// admin routes
router
  .route("/admin/users")
  .get(verifyUserAuth, roleBasedAccess("admin"), getUsers); // Get all users
router
  .route("/admin/user/:id")
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleUser) // Get a single user by ID
  .put(verifyUserAuth, roleBasedAccess("admin"), updateUserRole) // Update user's role
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteUser); // Delete a user ;

export default router;
