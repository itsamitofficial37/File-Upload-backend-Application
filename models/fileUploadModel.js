const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

// pre middleware 

fileUploadSchema.post("save", async function (doc) {
  try {
      console.log("DOC : ", doc)

      // transporter
      const transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PWD
          },
      })

      // send mail 
      const info = await transporter.sendMail({
          from: 'From Amit',
          to: doc.email,
          subject: "New File Uploaded to Cloudinary",
          html: `<h2>File Uploaded</h2> <br> view now - <a href="${doc.ImageUrl}">CLick Here</a>`
      })

      console.log("Info : ", info)
  }
  catch (err) {
      console.log(err);
  }
})
module.exports = mongoose.model("File", fileUploadSchema);
