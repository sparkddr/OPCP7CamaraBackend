const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

router.post("/", commentCtrl.newComment);
router.get("/", commentCtrl.findAllComment);
router.get("/:id", commentCtrl.findOneComment);
router.delete("/:id", commentCtrl.deleteComment);
router.put("/:id", commentCtrl.updateComment);

module.exports = router;
