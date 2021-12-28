const express = require("express");
const router = express.Router();

// GET method - /api/users
router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "회원 정보",
  };

  res.status(200).send(result);
});

router.use("/login", require("./login"));
router.use("/signup", require("./signup"));

module.exports = router;