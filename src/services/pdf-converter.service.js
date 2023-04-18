const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const User = require('../model/user.model');
const UserFile = require('../model/userFile.model')


async function convertPDF(req, res) {
  const ext = '.pdf'
  const filename = req.file.filename.split('.')[0];
  const uploadedFilePath = path.join(__dirname, `../../public/uploads/${req.file.filename}`);
  const outputPath = path.join(__dirname, `../../public/uploads/${filename}${ext}`);
  try {
    processFileConvert(uploadedFilePath, outputPath, ext);
    await fs.unlink(uploadedFilePath);
    const user = await User.findOne({ facebookId: req.user.userId }, { _id: 1 });
    console.log(user._id.toString());

    const userFile = new UserFile({
      user: user._id.toString(),
      filename: `${filename}${ext}`
    });

    await userFile.save();
    

    return { status: 'success',message: 'PDF converted Successfully successfully.' };
  } catch(e) {
    throw new Error('Error Convert, '+ e)
  }

}

async function processFileConvert(uploadedFilePath, outputPath, ext) {

    const docxBuf = await fs.readFile(uploadedFilePath);
    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
    
    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputPath, pdfBuf);
}

module.exports = {
  convertPDF,
}