const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/jwt.verify');
const twilioController = require('../controllers/twilio.controller');


router.post('/otp', authenticateToken, twilioController.otp);


module.exports = router;