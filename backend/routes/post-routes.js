const express = require("express");
const router = express.Router();

const postControll = require("../controllers/post-controller");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
//const adminAuth = require("../middleware/adminAuth");

router.post("/", auth, multer, postControll.createPost);
router.delete(
  "/:idpost",
  auth,
  /*adminAuth.authPost,*/ postControll.deletePost
);
router.put("/:idpost", auth, multer, postControll.modifyPost);
router.get("/:idpost", auth, postControll.getOnePost);
router.get("/", auth, postControll.listAllPosts);

module.exports = router;
