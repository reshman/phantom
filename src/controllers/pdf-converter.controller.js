const pdfConvertService = require('../services/pdf-converter.service');

async function docxToPDF(req, res, next) {
  try {
    console.log("user", req.user.userId)
    const response = await pdfConvertService.convertPDF(req, res);
    res.status(200).json(response);
  } catch (err) {
      return next(err);
  }
};

module.exports = {
  docxToPDF
};