import dotenv from "dotenv";
import app from "./app.js";
import connectMongoDatabase from "./config/db.js";

dotenv.config({ path: "backend/config/config.env" }); // setting the path for the env file
connectMongoDatabase(); // connect to MongoDB database
const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${port}: http://localhost:${port}`);
});
