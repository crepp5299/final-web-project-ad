const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  role: {
    type: Number,
    required: false,
    default: 0
  },
  isLock: {
    type: Boolean,
    required: false,
    default: false
  },
  isAuthenticated: {
    type: Boolean,
    required: false,
    default: false
  },
  verify_token: {
    type: String,
    required: false
  },
  stall: {
    sellCount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    products: [
      {
        sellCount: {
          type: Number,
          default: 0
        },
        id: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        }
      }
    ]
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
