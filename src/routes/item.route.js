const express = require('express');
const router = express.Router();
const buyController = require('../controllers/buy.controller');


router.post('/buy', buyController.buy);
router.post('/buy/order-complete', buyController.buyOrderCompletion);


module.exports = router;