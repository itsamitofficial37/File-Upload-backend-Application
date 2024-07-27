const File = require("../models/fileUploadModel");
const cloudinary = require("cloudinary").v2;

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

function isFileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

const uploadFileToCloudinary = async (file, folder, quality) => {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  const response = await cloudinary.uploader.upload(file.tempFilePath, options);

  return response;
};
exports.imageUpload = async (req, res) => {
  try {
    // fetch data from request
    const { name, email, tags } = req.body;
    console.log(name, email, tags);

    const file = req.files.imageFile;
    console.log(file);

    // validation

    const supportedType = ["jpg", "jpeg", "png"];

    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported ",
      });
    }

    // if file supported then cloud pr uplod krna hai

    const response = await uploadFileToCloudinary(file, "Amit");
    console.log(response);

    // db main entry daalni hai

    const fileData = await File.create({
      name,
      tags,
      email,
      ImageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded Successfully ",
    });
  } catch (err) {
    console.error(err);
  }
};

exports.videoUpload = async (req, res) => {
  try {
    // fetch krenege data request se
    const { name, email, tags } = req.body;

    // file fetch krenege

    const file = req.files.videoFile;

    // validate krte hai
    const supportedFiles = ["mov", "mp4"];
    // if file not supported
    if (!supportedFiles) {
      return (
        res.status(400),
        json({
          success: false,
          message: "File Format not supported",
        })
      );
    }

    // if file supported then upload to cloudinary

    const response = await uploadFileToCloudinary(file, "Amit");
    console.log(response);

    // db main entry create krni hai

    const fileData = await File.create({
      name,
      email,
      tags,
      ImageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Video uploaded Successfully ",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};

exports.imageResizer = async (req, res) => {
  try {
    // fectch kr lenge data ko req ki body se
    const { name, email, tags } = req.body;

    // file fetch kr lenge

    const file = req.files.Imagefile;

    // validate

    const supportedFiles = ["jpg", "jpeg", "png"];
    if (!supportedFiles) {
      return res.status(400).json({
        success: false,
        message: "Image Format is not supported ",
      });
    }
    // if ho gya to  cloudinary main upload krwa deng
    const response = await uploadFileToCloudinary(file, "Amit", 10);
    console.log(response);

    // db main save kr lete hai

    const fileData = File.create({
      name,
      email,
      tags,
      ImageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "Image resize Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};
