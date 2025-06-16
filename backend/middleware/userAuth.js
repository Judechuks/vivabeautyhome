import jwt from "jsonwebtoken";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import UserModel from "../models/userModel.js";

// check if user is authenticated/logged in
export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new HandleError(
        "Authentication is missing! Please login to access this resource",
        401
      )
    ); // If no token is found, return an error
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await UserModel.findById(decodedData.id); // Attach user information to the request object
  next(); // Proceed to the next middleware or route handler e.g getAllProducts
});

// authorization - assign certain action to user based on roles
export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `As a ${req.user.role}, you are not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
