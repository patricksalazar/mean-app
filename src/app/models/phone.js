const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
  type: String,
  number: String,
  extension: String,
  carrier: String
});

module.exports = mongoose.model('Phone', PhoneSchema);
