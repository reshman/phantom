const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
  facebookId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const User = Mongoose.model('User', userSchema);
module.exports = User;
