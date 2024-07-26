const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.cloudinaryConnect =  () => {
    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME,
        cloud_Api_key  : process.env.CLOUDINARY_API_KEY,
        cloud_Api_secret : process.env.CLOUDINARY_API_SECRET

    });
}