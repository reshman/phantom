const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf-converter.controller');

const path = require('path');
const authenticateToken = require('../middleware/jwt.verify');
const multer = require('multer');
const Joi = require('joi');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'), function(err, success) {
      if(err) throw err;
      console.log('file', file)
    });
  },
  filename: function(req, file, cb) {
    //console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  }, 
});

var upload = multer({ storage: storage });



router.post('/pdf', authenticateToken, upload.single('file'), pdfController.docxToPDF);


module.exports = router;