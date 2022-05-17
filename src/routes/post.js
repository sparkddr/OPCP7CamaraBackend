const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const auth = require("../auth/auth");

const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.addNewPost);
router.get("/", auth, postCtrl.findAllPost);
router.get("/:id", auth, postCtrl.findOnePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.updatePost);

module.exports = router;
