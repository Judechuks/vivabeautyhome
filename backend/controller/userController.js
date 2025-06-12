import handleAsyncError from "../middleware/handleAsyncError.js";
import UserModel from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";

// register a new user
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, phone, email, password } = req.body;

  const user = await UserModel.create({
    name,
    phone,
    email,
    password, // hash the password before saving it
    avatar: {
      public_id: "default_public_id", // Placeholder for avatar public ID
      url: "https://example.com/default-avatar.png", // Placeholder for avatar URL
    },
  });

  const token = user.getJwtToken(); // Generate JWT token for the user

  sendToken(user, 201, res);
});

// getAllUsers,
export const getAllUsers = handleAsyncError(async (req, res, next) => {
  const users = await UserModel.find();
  if (!users || users.length === 0) {
    return next(new HandleError("No users found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users,
  });
});

// getSingleUser,
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get user ID from request parameters
  if (!id) {
    return next(new HandleError("User ID is required", 400));
  }
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new HandleError("User not found", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  }
});

// updateUser,
export const updateUser = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new HandleError("User ID is required", 400));
  }
  const user = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true, // to return the updated document
    runValidators: true, // to run validation on the updated document
  });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

// deleteUser,
export const deleteUser = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new HandleError("User ID is required", 400));
  }
  const user = await UserModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// login user,
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new HandleError("Please provide email and password", 400));
  }

  // Find user by email and select password
  const user = await UserModel.findOne({ email }).select("+password");

  // Check if user exists and password matches
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }

  const isPasswordValid = await user.verifyPassword(password); // Verify the password
  if (!isPasswordValid) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const token = user.getJwtToken(); // Generate JWT token for the user

  sendToken(user, 200, res);
});
