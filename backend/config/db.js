import mongoose from "mongoose";

const connectMongoDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI).then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  });
  // .catch((error) => {
  //   console.error(`Error connecting to MongoDB: ${error.message}`);
  // });
  // already handled in server.js - unhandledRejection
};
export default connectMongoDatabase;
