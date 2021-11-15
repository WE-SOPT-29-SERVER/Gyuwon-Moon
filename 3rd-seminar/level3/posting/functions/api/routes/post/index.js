const express = require("express")
const router = express.Router();

router.get("/", require("./postGET"))
router.get("/:id", require("./postIdGET"))
router.post("/", require("./postPOST"))
router.put("/:id", require("./postIdPUT"))
router.delete("/:id", require("./postIdDELETE"))

module.exports = router;