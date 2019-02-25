const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../data/helpers/usersDb');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  db.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the list of users at this time', error: err}));
})

function restricted(req, res, next) {
  if(!req.headers.username || !req.headers.password) {
    res.status(401).json({message: 'Please provide a username and password in headers'})
  } else {
    db.findBy({username: req.headers.username})
    .then(user => {
      if(user && bcrypt.compareSync(req.headers.password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: 'Invalid Credentials'});
      }
    })
    .catch(err => res.status(500).json({errorMessage: 'Could get list of users at this time', error: err}));
  }
}

module.exports = router;