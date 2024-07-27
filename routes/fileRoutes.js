const express = require("express");
const router = express.Router();
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageResizer,
} = require("../controller/fileUpload");

router.get("/", (req, res) => {
  res.send("Welcome to the file upload Server");
});

router.post("/upload/localfiles", localFileUpload);
router.post("/upload/fileupload", imageUpload);
router.post("/upload/videoupload", videoUpload);
router.post("/upload/imageresize", imageResizer);

module.exports = router;
