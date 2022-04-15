const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../auth/auth");

router.get("/", auth, userCtrl.findAllUsers);
router.get("/:id", userCtrl.findOneUser);
router.delete("/:id", userCtrl.deleteUser);
router.put("/:id", userCtrl.updateUser);

module.exports = router;
