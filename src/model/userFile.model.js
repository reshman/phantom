const Mongoose = require("mongoose");

const userFileSchema = new Mongoose.Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  filename: {
    type: String,
    required: true,
  },
});
const UserFile = Mongoose.model('UserFile', userFileSchema);
module.exports = UserFile;
