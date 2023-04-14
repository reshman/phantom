const pdfConvertService = require('../services/pdf-converter.service');

async function docxToPDF(req, res, next) {
  try {

    await pdfConvertService.convertPDF(req, res);
    res.status(200).json({ status: 'success',message: 'OTP sent successfully.' });
  } catch (err) {
      //return next(err);
  }
};

module.exports = {
  docxToPDF
};