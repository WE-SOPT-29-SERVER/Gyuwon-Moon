const express = require("express")
const router = express.Router();
const { checkUser } = require('../../../middlewares/auth');

router.get("/list", require("./postListGET"))

// 로그인이 필요한 요청에 checkUser를 넣어줌
router.get("/:postId", checkUser, require("./postGET"))

router.post("/", require("./postPOST"))
router.put("/:postId", require("./postPUT"))
router.delete("/:postId", require("./postDELETE"))

module.exports = router;