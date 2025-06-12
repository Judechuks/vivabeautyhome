import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [
        50,
        "Invalid name. Please enter a name with less than 50 characters",
      ],
      minLength: [
        1,
        "Invalid name. Please enter a name with more than 1 characters",
      ],
      trim: true, // ensure there is no space before and after user's name
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
      unique: true,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, "any", { strictMode: false }); // example: +2348034567890 or 08034567890
        },
        message: "Please enter a valid phone number",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false, // do not return password in the response or show it to the admin
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
// the timestamps indicates the "createdAt, updatedAt" properties

// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 10); // hash the password with bcrypt using 10 rounds
  // the 10 rounds is the number of times the password will be hashed, which makes it more secure
  // 1st - update profile (name, email, phone, avatar) - dont hash password again
  // 2nd - update password - will hash the password again
  if (!this.isModified("password")) {
    return next();
  }
});

// generates a signed JWT token with user ID and secret key
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE, // token expiration time
  });
};

// Method to compare the entered password with the hashed password in the database
userSchema.methods.verifyPassword = async function (userEnteredPassword) {
  return await bcryptjs.compare(userEnteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
