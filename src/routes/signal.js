const express = require("express");
const router = express.Router();
const signalCtrl = require("../controllers/signal");
const auth = require("../auth/auth");

router.post("/signal/comments", auth, signalCtrl.addNewSignalComment);
router.get("/signal/comments/:id", auth, signalCtrl.findOneSignalComment);
router.get("/signal/comments", auth, signalCtrl.findAllSignalComments);
router.delete("/signal/comments/:id", auth, signalCtrl.deleteSignalComment);

router.post("/signal/posts", auth, signalCtrl.addNewSignalPost);
router.get("/signal/posts/:id", auth, signalCtrl.findOneSignalPost);
router.get("/signal/posts", auth, signalCtrl.findAllSignalPosts);
router.delete("/signal/posts/:id", auth, signalCtrl.deleteSignalPost);

module.exports = router;
