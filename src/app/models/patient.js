const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = require('mongoose').model('Company').schema;
const ContactSchema = require('mongoose').model('Contact').schema;
const PhoneSchema = require('mongoose').model('Phone').schema;

const PatientSchema = new Schema({
  firstName: String,
  lastName: String,
  fullAddress: String,
  lat: Number,
  lng: Number,
  birthDate: Date,
  priority: Number,
  payerId: String,
  memberId: String,
  groupId: String,
  caseManagerId: String,
  emergencyId: String,
  phones: [PhoneSchema],
  contacts: [ContactSchema],
  providers: [CompanySchema],
});

module.exports = mongoose.model('Patient', PatientSchema);
