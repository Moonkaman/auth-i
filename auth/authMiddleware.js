const bcrypt = require('bcrypt');

function restricted(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.status(401).send('Please Log In');
  }
}

module.exports = {
  restricted
}