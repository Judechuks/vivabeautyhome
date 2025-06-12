import dotenv from "dotenv";
import app from "./app.js";
import connectMongoDatabase from "./config/db.js";

dotenv.config({ path: "backend/config/config.env" }); // setting the path for the env file
connectMongoDatabase(); // connect to MongoDB database

// handle uncaught exception error - like an undefined variable in the server.js file
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.warn(`Server is shutting down due to uncaught exception errors`);
  process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${port}: http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.warn(`Server is shutting down due to unhandled promise rejection...`);
  // Close the server
  server.close(() => {
    process.exit(1); // Exit the process with failure
  });
});

p;
