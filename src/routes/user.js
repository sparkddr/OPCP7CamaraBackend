const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../auth/auth");

const multer = require("../middleware/multer-config");
const { upload, uploadImage } = require("../middleware/multer-config");

router.get("/", auth, userCtrl.findAllUsers);
router.get("/:id", userCtrl.findOneUser);
router.delete("/:id", userCtrl.deleteUser);
router.put("/:id", multer, userCtrl.updateUser);

module.exports = router;
