const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/save");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const nameTwo = name.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, nameTwo + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("picture");

// const multer = require("multer");

// const upload = multer({
//   dest: "images/save",
// });

// exports.uploadImage = upload.single("picture");

// exports.upload = (req, res) => {
//   console.log(req.file);
//   res.status(200).json({ success: "Sucess" });
// };
