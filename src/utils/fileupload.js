const multer = require('multer');
const path = require('path');


const upload = () => {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }, 
  });

  var upload = multer({ storage: storage });;
  return upload;
};

module.exports = upload;