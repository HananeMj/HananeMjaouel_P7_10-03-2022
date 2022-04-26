const express = require("express");
const router = express.Router();

const commentControll = require("../controllers/comment-controller");
const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

router.post("/:postid", auth, commentControll.createComment);
router.delete("/:id", auth, commentControll.deleteComment);
router.put("/:id", auth, commentControll.modifyComment);
router.get("/:postid", auth, commentControll.getAllComments);

module.exports = router;
