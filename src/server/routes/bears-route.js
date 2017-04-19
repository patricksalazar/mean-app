const express = require('express');
const router = express.Router();

const Bear = require('../../app/models/bear');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  next()
})

// on routes that end in /bears
router.route('/')
  .get(function (req, res) {
    Bear.find(function(err, bears) {
      if (err) res.send(err);
      res.json(bears);
    })
  })
  .post(function (req, res) {
    let bear = new Bear();  // create a new instance of the Bear model
    bear.name = req.body.name; // set the bears name from request

    // save the bear and check for errors
    bear.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Bear created!' });
    });
  });

// on routes that end in /bears/:bear_id
router.route('/:bear_id')
  .get(function (req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      res.json(bear);
    })
  })
  .put(function (req, res) {
    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      bear.name = req.body.name;  // update the bears info

      // save the bear
      bear.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Bear updated!' });
      });
    })
  })
  .delete(function (req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    })
  });

module.exports = router
