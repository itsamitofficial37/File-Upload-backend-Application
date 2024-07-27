const express = require("express"); // import express
const app = express(); // single instance of express
require("dotenv").config(); // basically whatever in .env file we put in process object
const fileRoutes = require("./routes/fileRoutes"); // routes ko import karaya hai

app.use(express.json()); // Middleware to parse json body
const fileUpload = require("express-fileupload");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
); // Middleware to upload files

// app mount

app.use("/api/v1", fileRoutes);

const port = process.env.PORT || 5001;

// Db connect

const dbConnect = require("./config/dataBase");
dbConnect();

// cloudinary connect

const cloudinary = require("./config/cloudnary");
cloudinary.cloudinaryConnect();
// app Listen

app.listen(port, () => {
  console.log(`App is listning on ${port}`);
});
