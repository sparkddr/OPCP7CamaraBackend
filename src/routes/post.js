const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");

const multer = require("../middleware/multer-config");

router.post("/", postCtrl.addNewPost);
router.get("/", postCtrl.findAllPost);
router.get("/:id", postCtrl.findOnePost);
router.delete("/:id", postCtrl.deletePost);
router.put("/:id", postCtrl.updatePost);

module.exports = router;
