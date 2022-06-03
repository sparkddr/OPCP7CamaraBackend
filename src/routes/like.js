const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

router.get("/post/:id", auth, likeCtrl.getPostLikes);
router.post("/", auth, likeCtrl.addNewLike);
router.delete("/:id", auth, likeCtrl.deleteLike);

module.exports = router;
