const express = require('express');
const router = express.Router();

require('../../app/models/company');
require('../../app/models/contact');
require('../../app/models/phone');
const Patient = require('../../app/models/patient');

function setPatient(patient, obj) {
  patient.firstName = obj.firstName;
  patient.lastName = obj.lastName;
  patient.fullAddress = obj.fullAddress;
  patient.lat = obj.lat;
  patient.lng = obj.lng;
  patient.email = obj.email;
  patient.birthDate = obj.birthDate;
  patient.priority = obj.priority;
  patient.payerId = obj.payerId;
  patient.memberId = obj.memberId;
  patient.groupId = obj.groupId;
  patient.caseManagerId = obj.caseManagerId;
  patient.emergencyId = obj.emergencyId;
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  next()
})

// on routes that end in /patients
router.route('/')
  .get(function (req, res) {
    Patient.find(function(err, patients) {
      if (err) res.send(err);
      res.json(patients);
    })
  })
  .post(function (req, res) {
    let patient = new Patient();  // create a new instance of the Patient model
    console.log("patient:"+JSON.stringify(req.body));
    setPatient(patient, req.body);

    // save the patient and check for errors
    patient.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Patient created!' });
    });
  });

// on routes that end in /patient/:patient_id
router.route('/:patient_id')
  .get(function (req, res) {
    Patient.findById(req.params.patient_id, function(err, patient) {
      if (err) res.send(err);
      res.json(patient);
    })
  })
  .put(function (req, res) {
    // use our patient model to find the patient we want
    Patient.findById(req.params.patient_id, function(err, patient) {
      if (err) res.send(err);
      setPatient(patient, req.body);  // update the patient's info

      // save the patient
      patient.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Patient updated!' });
      });
    })
  })
  .delete(function (req, res) {
    Patient.remove({
      _id: req.params.patient_id
    }, function(err, patient) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    })
  });

module.exports = router
