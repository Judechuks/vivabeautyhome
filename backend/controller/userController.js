import crypto from "crypto";
import handleAsyncError from "../middleware/handleAsyncError.js";
import UserModel from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import userModel from "../models/userModel.js";

// 1. register a new user
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password, // hash the password before saving it
    avatar: {
      public_id: "default_public_id", // Placeholder for avatar public ID
      url: "https://example.com/default-avatar.png", // Placeholder for avatar URL
    },
  });

  const token = user.getJwtToken(); // Generate JWT token for the user

  sendToken(user, 201, res, "Usser registered successfully");
});

// 2. login user,
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

// 3. logout user
export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // Set cookie expiration to the past to clear it
    httpOnly: true, // Make cookie inaccessible via JavaScript
  });
  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});

// 4. Forgot Password
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(
      new HandleError(
        "There is no user with this email. You should create account instead",
        400
      )
    );
  }
  let resetToken;
  try {
    resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false }); // prevent the required and validation on the user model
  } catch (error) {
    return next(
      new HandleError("Could not save reset token, please try again later", 500)
    );
  }
  const resetPasswordURL = `https://localhost/api/v1/reset/${resetToken}`;
  const message = `Use the following link to reset your password: \n\n${resetPasswordURL} \n\nThis link will expire in 10 minutes. \n\nIf you did't request a password reset, please ignore this message.`;
  try {
    // Send Reset Email to user
    await sendEmail({
      email: user.email,
      subject: `Password Reset Request`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email could not be sent, please try again later", 500)
    );
  }
});

// 5. Reset Password
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new HandleError("Reset password token is invalid or has expired.", 400)
    );
  }
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("password does not match.", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res, "Password reset successful");
});

// 6. Get user details
export const getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: "Profile details fetched successfully",
    user,
  });
});

// 7. update password
export const updatePassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await UserModel.findById(req.user.id).select("+password"); // because in userModel, password select was set to false
  const checkPasswordMatch = await user.verifyPassword(oldPassword);
  if (!checkPasswordMatch) {
    return next(new HandleError("Old password is incorrect", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(
      new HandleError("New password and confirm password does not match", 400)
    );
  }
  if (oldPassword === newPassword) {
    return next(
      new HandleError("Old password should not be same with new password", 400)
    );
  }
  user.password = newPassword;
  await user.save();
  sendToken(user, 200, res, "Password changed successfully");
});

// 8. updating user profile
export const updateProfile = handleAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  const updateUserDetails = {
    name,
    email,
  };
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    updateUserDetails,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// 9. Admin - getting all users
export const getUsers = handleAsyncError(async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users,
  });
});

// 10. Admin - getting single user information
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get user ID from request parameters
  if (!id) {
    return next(new HandleError("User ID is required", 400));
  }
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new HandleError(`User with id: ${id} does not exist`, 400));
  }
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
});

//11. Admin - changing user's role
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const newUserData = { role };
  const user = await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true, // to return the updated document
    runValidators: true, // to run validation on the updated document
  });
  if (!user) {
    return next(new HandleError("User does not exist", 400));
  }
  res.status(200).json({
    success: true,
    message: "User's role updated successfully",
    user,
  });
});

// 12. Admin - delete user's profile
export const deleteUser = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new HandleError("User ID is required", 400));
  }
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new HandleError("User does not exist", 400));
  }
  await UserModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
