const express = require("express");
const router = express.Router();
const publicRouter = require("./publicRouter");
const adminRouter = require("./adminRouter");
const errorHandler = require('../middlewares/errorHandler')

router.use("/public", publicRouter);
router.use("/admin", adminRouter);

router.use(errorHandler)

module.exports = router;
