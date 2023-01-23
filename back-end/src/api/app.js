const express = require('express');
const cors = require('cors');
require('express-async-errors');

const loginRoutes = require('./routes/login.routes');

const handleError = require('../middlewares/handleError');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRoutes);

app.use(handleError);

module.exports = app;
