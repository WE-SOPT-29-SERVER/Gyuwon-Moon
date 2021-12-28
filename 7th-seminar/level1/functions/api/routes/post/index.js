const express = require("express")
const router = express.Router();
const { checkUser } = require('../../../middlewares/auth');
const uploadImage = require('../../../middlewares/uploadImage');

router.get("/list", require("./postListGET"))

// 로그인이 필요한 요청에 checkUser를 넣어줌
router.get("/:postId", checkUser, require("./postGET"))

// 파일을 업로드해야 하는 route에 uploadImage를 넣어줌
router.post("/", uploadImage, require("./postPOST"))

router.put("/:postId", require("./postPUT"))
router.delete("/:postId", require("./postDELETE"))

module.exports = router;