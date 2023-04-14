const authService = require('../services/auth.service');

async function fbAuth(req, res, next) {
  try {
    res.json(await authService.facebookAuthentication());
  } catch (err) {
      console.error(`Error while getting programming languages`, err.message);
      next(err);
  }
}

module.exports = {
  fbAuth
};