const express = require("express");
const router = express.Router();
const signalCtrl = require("../controllers/signal");
const auth = require("../middleware/auth");
const isadmin = require("../middleware/isadmin");

router.post("/signal/comments", auth, signalCtrl.addNewSignalComment);
router.get(
  "/signal/comments/:id",
  auth,
  isadmin,
  signalCtrl.findOneSignalComment
);
router.get("/signal/comments", auth, isadmin, signalCtrl.findAllSignalComments);
router.delete(
  "/signal/comments/:id",
  auth,
  isadmin,
  signalCtrl.deleteSignalComment
);

router.post("/signal/posts", auth, signalCtrl.addNewSignalPost);
router.get("/signal/posts/:id", auth, isadmin, signalCtrl.findOneSignalPost);
router.get("/signal/posts", auth, isadmin, signalCtrl.findAllSignalPosts);
router.delete("/signal/posts/:id", auth, isadmin, signalCtrl.deleteSignalPost);

module.exports = router;
