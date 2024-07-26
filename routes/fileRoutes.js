const express = require("express");
const router = express.Router();
const { localFileUpload } = require("../controller/fileUpload");

router.get("/", (req, res) => {
  res.send("Welcome to the file upload Server");
});

router.post("/upload/localfiles", localFileUpload);

module.exports = router;
