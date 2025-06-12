import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product's name"],
    trim: true, // ensure there is no space before and after product name
  },
  description: {
    type: String,
    required: [true, "Please enter product's description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product's price"],
    maxLength: [10, "Price can not exceed 10 digits"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product's category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product's stock"],
    maxLength: [100, "Stock can not exceed 100 digits"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// you have to export the model's name as singular, but in the mongoDB compass, it will appear as plural and in lowercase
export default mongoose.model("Product", productSchema);
