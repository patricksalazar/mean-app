const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('./phone');
const PhoneSchema = require('mongoose').model('Phone').schema;

const ContactSchema = new Schema({
  extId: String,
  firstName: String,
  lastName: String,
  type: String,
  specialty: String,
  companyId: Number,
  email: String,
  note: String,
  phones: [PhoneSchema]
});

module.exports = mongoose.model('Contact', ContactSchema);
