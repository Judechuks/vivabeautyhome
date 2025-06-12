import HandleError from "../utils/handleError.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // CastError
  if (err.name === "CastError") {
    const message = `This is invalid resource, coming from the path: ${err.path}`;
    err = new HandleError(message, 404);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `This ${Object.keys(
      err.keyValue
    )} already exists. Please log in instead.`;
    err = new HandleError(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};
