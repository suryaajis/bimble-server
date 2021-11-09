const express = require("express");
const router = express.Router();
const publicRouter = require("./publicRouter");
const adminRouter = require("./adminRouter");

router.use("/public", publicRouter);
router.use("/admin", adminRouter);

module.exports = router;
