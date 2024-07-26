const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("DB connection is Succesfully");
};

module.exports = dbConnect;
