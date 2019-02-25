const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcrypt');

const usersRouter = require('./users/usersRouter');

const db = require('./data/helpers/usersDb');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/users', usersRouter);

const port = process.env.PORT || 8000;

server.post('/api/register', (req, res) => {
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

server.post('/api/login', (req, res) => {
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

server.listen(port, _ => console.log(`\n***Server is listening on port ${port}***\n`));