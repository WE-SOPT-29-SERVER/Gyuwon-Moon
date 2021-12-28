const express = require("express")
const router = express.Router();

router.get("/list", require("./postListGET"))
router.get("/:postId", require("./postGET"))
router.post("/", require("./postPOST"))
router.put("/:postId", require("./postPUT"))
router.delete("/:postId", require("./postDELETE"))

module.exports = router;