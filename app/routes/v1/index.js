const userRouter = require ("./user.routes");
const messageRouter = require ("./message.routes");

const express = require('express');

const router = express.Router();

router.use("/user", userRouter)
router.use("/message", messageRouter)

module.exports = router;