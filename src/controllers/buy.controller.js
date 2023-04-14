const itemService = require('../services/item.service');

async function buy(req, res, next) {
  try {
    //res.json();
    await itemService.purchase(req, res);
  } catch (err) {
      console.error(`Error `, err.message);
      next(err);
  }
}

async function buyOrderCompletion(req, res, next) {
  try {
    await itemService.checkOrderCompletion(req, res);
  } catch (err) {
      console.error(`Error`, err.message);
      next(err);
  }
}

module.exports = {
  buy,
  buyOrderCompletion
};