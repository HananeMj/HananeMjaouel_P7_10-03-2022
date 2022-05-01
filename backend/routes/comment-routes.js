const express = require("express");
const router = express.Router();

const commentControll = require("../controllers/comment-controller");
const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

router.post("/:postid/comment", auth, commentControll.createComment);
router.delete("/comment/:idcomment", auth, commentControll.deleteComment);
router.put("/comment/:idcomment", auth, commentControll.modifyComment);
router.get("/:postid/comments", auth, commentControll.getAllComments);
router.get("/comment/:idcomment", auth, commentControll.getOneComment);

module.exports = router;
