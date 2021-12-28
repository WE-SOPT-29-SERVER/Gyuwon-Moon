const express = require("express");
const router = express.Router();

// GET method - /api/blog
router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "blog 페이지에 입장!",
  };

  res.status(200).send(result);
});

router.use("/post", require("./post"));

module.exports = router;