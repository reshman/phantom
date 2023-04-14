const twilioService = require('../services/twilio.service');

async function otp(req, res, next) {
  try {
    await twilioService.generateOtp(req, res);
    res.status(200).json({ status: 'success',message: 'OTP sent successfully.' });
  } catch (err) {
      return next(err);
  }
};

module.exports = {
  otp
};