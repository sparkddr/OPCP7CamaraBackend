const express = require("express");
const router = express.Router();
const signalCtrl = require("../controllers/signal");

router.post("/signal/comments", signalCtrl.addNewSignalComment);
router.get("/signal/comments/:id", signalCtrl.findOneSignalComment);
router.get("/signal/comments", signalCtrl.findAllSignalComments);
router.delete("/signal/comments/:id", signalCtrl.deleteSignalComment);

router.post("/signal/posts", signalCtrl.addNewSignalPost);
router.get("/signal/posts/:id", signalCtrl.findOneSignalPost);
router.get("/signal/posts", signalCtrl.findAllSignalPosts);
router.delete("/signal/posts/:id", signalCtrl.deleteSignalPost);

module.exports = router;
