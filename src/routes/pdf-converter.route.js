const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf-converter.controller');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }, 
});

var upload = multer({ storage: storage });


router.post('/pdf', upload.single('file'), pdfController.docxToPDF);


module.exports = router;