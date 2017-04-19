const express = require('express');
const router = express.Router();

require('../../app/models/contact');
const User = require('../../app/models/user');

function setUser(user, obj) {
  user.user = obj.user;
  user.password = obj.password;
  user.email = obj.email;
  user.firstName = obj.firstName;
  user.lastName = obj.lastName;
  user.role = obj.role;
  user.companyId = obj.companyId;
  user.specialty = obj.specialty;
  user.phone = obj.phone;
  user.mobile = obj.mobile;
  user.fax = obj.fax;
  user.extId = obj.extId;
  user.note = obj.note;
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  next()
})

// on routes that end in /users
router.route('/')
  .get(function (req, res) {
    User.find(function(err, users) {
      if (err) res.send(err);
      res.json(users);
    })
  })
  .post(function (req, res) {
    let user = new User();  // create a new instance of the User model
    setUser(user, req.body);

    // save the user and check for errors
    user.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'User created!' });
    });
  });

// on routes that end in /user/:user_id
router.route('/:user_id')
  .get(function (req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      res.json(user);
    })
  })
  .put(function (req, res) {
    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      setUser(user, req.body);  // update the user's info

      // save the user
      user.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'User updated!' });
      });
    })
  })
  .delete(function (req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    })
  });

// attempt login
router.route('/:user_id/login')
  .get(function (req, res) {
    let user = new User();  // create a new instance of the User model
    setUser(user, req.body);

    // save the user and check for errors
    user.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'User created!' });
    });
  });
module.exports = router
