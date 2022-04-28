const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");

router.get("/post/:id", likeCtrl.getPostLikes);
router.post("/", likeCtrl.addNewLike);
router.delete("/:id", likeCtrl.deleteLike);

module.exports = router;
