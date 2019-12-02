const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  isAdministrator: {
    type: String,
    required: false,
    default: false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
