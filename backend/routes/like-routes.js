const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/likes-controller");
const auth = require("../middleware/auth");

router.get("/:postid/likes", auth, likeCtrl.getLikes);
router.post("/:postid/like", auth, likeCtrl.likePost);

module.exports = router;
