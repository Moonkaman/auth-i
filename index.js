const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('./data/dbConfig');

const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');

server.use(session({
  name: 'banana',
  secret: process.env.SECRET || 'this is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,

  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}))

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/users', usersRouter);
server.use('/api', authRouter);

const port = process.env.PORT || 8000;

server.listen(port, _ => console.log(`\n***Server is listening on port ${port}***\n`));