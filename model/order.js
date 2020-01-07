const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: { type: Object, required: true },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false,
    default: Date.now
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  status: Number
});

orderSchema.methods.generateCartArray = function() {
  var arr = [];
  for (var id in this.cart.items) {
    arr.push(this.cart.items[id]);
  }
  return arr;
};

module.exports = mongoose.model('Order', orderSchema);
