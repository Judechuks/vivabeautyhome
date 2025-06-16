export const sendToken = (user, statusCode, res, msg) => {
  const token = user.getJwtToken();
  // option for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.EXPIRE_COOKIE * 24 * 60 * 60 * 1000
    ), // cookie expiration time
    httpOnly: true, // cookie is not accessible via JavaScript only by the server
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message: msg || "User authenticated successfully",
      user,
    });
};
