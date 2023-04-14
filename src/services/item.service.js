const { response } = require('express');
const Razorpay = require('razorpay');
const uuid = require('uuid');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

async function purchase(req, res) {
  //let { amount } = req.body;
  let amount = 500;
  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: uuid.v4(),
    //payment_capture: '1',
  };
  
  razorpay.orders.create(options, function(err, order) {
    console.log(err)
    res.json(order);
  });
}

async function checkOrderCompletion(req, res) {
  const paymentDoc = await razorpay.payments.fetch(req.body.razorpay_payment_id);
  console.log('paymentDoc', paymentDoc)
  if (paymentDoc && paymentDoc.status === 'captured') {
    res.render('razorpay-complete.ejs');
  } else {
    res.render('razorpay-failed.ejs');
  }
  
};

module.exports = {
  purchase,
  checkOrderCompletion
}