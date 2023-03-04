/* eslint-disable no-unused-vars */
const multer = require("multer");
const randomstring = require("randomstring");

const generateFileName = name => {
  return randomstring.generate(7) + name;
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, generateFileName(file.originalname));
  }
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/svg" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(
      { success: false, message: "You can not upload this type of image" },
      false
    );
  }
};

const upload = multer({
  storage
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  // fileFilter: filter
});

module.exports = upload;
