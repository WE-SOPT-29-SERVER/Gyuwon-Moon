const express = require("express")
const router = express.Router();

router.post("/signup", require("./userSignupPOST"))
router.post("/login", require("./userLoginPOST"))
router.get("/profile/:id", require("./userProfileGET"))
router.put("/:id", require("./userPUT"))
router.delete("/:id", require("./userDELETE"))


module.exports = router;