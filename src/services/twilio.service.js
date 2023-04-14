
const twilio = require('twilio');
const Joi = require('joi');
require('dotenv').config();

// Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Create Twilio client
const client = twilio(accountSid, authToken);

/**
 * 
 * please use +919809456243 to send sms
 */
async function generateOtp(req, res) {
  const otp = Math.floor(Math.random() * 1000000);
  const otpSchema = Joi.object({
    mobileNumber: Joi.string()
    .pattern(/^[+]\d{1,3}\d{10}$/)
    .required()
  });

  const { error, value } = otpSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    console.log('errr')
    throw new Error('Invalid mobileNumber');
  }

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: twilioPhoneNumber,
      to: value.mobileNumber
    })
    .then(() => {
      return;
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error sending OTP.', status: 'fail' });
    });
}

module.exports = {
  generateOtp,
}