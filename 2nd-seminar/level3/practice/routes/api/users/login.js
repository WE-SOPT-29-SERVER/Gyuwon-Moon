const express = require("express");
const router = express.Router();

// GET method - api/users/login
router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "로그인 해주세요.",
  };

  res.status(200).send(result);
});

module.exports = router;