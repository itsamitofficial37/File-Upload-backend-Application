const File = require("../models/fileUploadModel");

exports.localFileUpload = async (req, res) => {
  try {
    // fetch file from request
    const file = req.files.file;

    // store or server path

    const path =
      __dirname + "/files/" + Date.now() + "." + `${file.name.split(".")[1]}`;

    // path ko move krna hai
    file.mv(path, (err) => {
      //   console.log(err);
    });
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (err) {
    console.log("Not able to upload the file on server");
    console.log(error);
  }
};
