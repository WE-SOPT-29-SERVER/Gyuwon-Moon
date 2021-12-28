const express = require("express");
const router = express.Router();

// GET method - /api
router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "안녕 나는 api",
  };

  res.status(200).send(result);
});

router.use("/blog", require("./blog"));
router.use("/users", require("./users"));

module.exports = router;