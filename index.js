const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(helmet());
server.use(morgan('dev'));

const port = process.env.PORT || 8000;

server.listen(port, _ => console.log(`\n***Server is listening on port ${port}***\n`));