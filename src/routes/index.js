const express = require('express');
const router = express.Router();
const productosRouter = require('./productos');

router.use("/productos", productosRouter);

module.exports = router;