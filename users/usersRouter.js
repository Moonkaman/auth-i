const express = require('express');

const db = require('../data/helpers/usersDb');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the list of users at this time', error: err}));
})

module.exports = router;