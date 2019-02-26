const express = require('express');
const bcrypt = require('bcrypt');

const db = require('../data/helpers/usersDb');

const router = express.Router();

router.post('/api/register', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).json({errorMessage: 'Please provide a username & password'});
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 12);
    console.log(req.body.username)
    console.log(req.body.password)
    db.insert(req.body)
      .then(id => res.status(201).json({message: 'Successfully signed up', id: id[0]}))
      .catch(err => res.status(500).json({errorMessage: 'Could not register at this time', error: err}));
  }
})

router.post('/api/login', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).json({errorMessage: 'Please provide a username & password'});
  } else {
    db.findBy({username: req.body.username})
      .then(user => {
        if(user && bcrypt.compareSync(req.body.password, user.password)) {
          res.status(200).json({ message: `Logged in ${user.username}` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials'});
        }
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not Log in at this time', error: err}));
  }
})

module.exports = router;