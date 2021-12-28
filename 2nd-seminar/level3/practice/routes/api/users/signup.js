const express = require("express");
const router = express.Router();

// GET method - api/users/signup
router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "회원가입 해주세요.",
  };

  res.status(200).send(result);
});

module.exports = router;