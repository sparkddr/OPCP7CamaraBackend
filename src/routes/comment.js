const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../auth/auth");

router.post("/", auth, commentCtrl.newComment);
router.get("/", auth, commentCtrl.findAllComment);
router.get("/:id", auth, commentCtrl.findOneComment);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.put("/:id", auth, commentCtrl.updateComment);

module.exports = router;
