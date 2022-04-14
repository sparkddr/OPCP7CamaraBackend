const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/", userCtrl.newUser);
router.get("/", userCtrl.findAllUsers);
router.get("/:id", userCtrl.findOneUser);
router.delete("/:id", userCtrl.deleteUser);
router.put("/:id", userCtrl.updateUser);

module.exports = router;
