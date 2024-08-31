const express = require("express");
const controller = require("../routes/v1/Users");
const router = express.Router();

router.use("/api/v1", controller);

module.exports = router;
