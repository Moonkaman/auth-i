const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');

const db = require('../data/helpers/usersDb');

const router = express.Router();

router.post('/register', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).json({errorMessage: 'Please provide a username & password'});
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 12);
    db.insert(req.body)
      .then(newUser => {
        console.log('new user here')
        console.log(newUser);
        req.session.user = newUser;
        console.log('after req.session.user')
        res.status(201).json({message: `Successfully signed up, welcome ${newUser.username}`})
        console.log('very end')
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not register at this time', error: err}));
  }
})

router.post('/login', (req, res) => {
  if(!req.body.username || !req.body.password) {
    res.status(400).json({errorMessage: 'Please provide a username & password'});
  } else {
    db.findBy({username: req.body.username})
      .then(user => {
        if(user && bcrypt.compareSync(req.body.password, user.password)) {
          req.session.user = user;
          res.status(200).json({ message: `Logged in ${user.username}` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials'});
        }
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not Log in at this time', error: err}));
  }
})

router.get('/logout', (req, res) => {
  if(req.session.user) {
    req.session.destroy(err => {
      if(err) {
        res.status(500).send('Couldnt log you out');
      } else {
        res.status(200).send('Logged out');
      }
    });
  } else {
    res.status(400).send('Alredy logged out.')
  }
})

module.exports = router;