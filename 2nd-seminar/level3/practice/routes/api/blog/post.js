const express = require("express");
const router = express.Router();

// GET method - /api/blog/post
router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "글을 작성해주세요.",
  };

  res.status(200).send(result);
});

module.exports = router;