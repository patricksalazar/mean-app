const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  company: String,
  type: String,
  fullAddress: String,
  phone: Number,
  fax: Number
});

module.exports = mongoose.model('Company', CompanySchema);
