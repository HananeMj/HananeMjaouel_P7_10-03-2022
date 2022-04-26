const express = require("express");
const router = express.Router();

const postControll = require("../controllers/post-controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postControll.createPost);
router.delete("/:id", auth, postControll.deletePost);
router.put("/:id", auth, multer, postControll.modifyPost);
router.get("/", auth, postControll.getAllposts);
router.get("/:id", auth, postControll.getOnePost);

module.exports = router;
