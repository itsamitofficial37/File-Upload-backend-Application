const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("File", fileUploadSchema);
