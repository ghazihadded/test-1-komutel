const express = require("express");
const router = express.Router();

const { calculeAge } = require("../controllers/user");

router.post("/", calculeAge);

module.exports = router;
