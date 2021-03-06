const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/user-controller");
const password = require("../middleware/password-valid");
const multer = require("../middleware/multer-config");

//routes user
router.post("/signup", password, userController.signup);
router.post("/login", userController.login);
router.get("/currentUser/:iduser", auth, userController.getOneUser);
router.get("/", auth, userController.getAllusers);
router.delete("/:iduser", auth, userController.deleteUser);
router.put("/profil/:iduser", auth, multer, userController.uploadAvatar);
//router.put("/profil/:iduser", auth, userController.updateUser);

//export du routeur
module.exports = router;
