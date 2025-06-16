import crypto from "crypto";
// const resetToken = crypto.randomBytes(32).toString("hex");
const resetToken = crypto.randomBytes(20).toString("hex");
const resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");
console.log("resetToken:", resetPasswordToken);

// Alternatively, you can run the following code in the terminal to generate random bytes
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
