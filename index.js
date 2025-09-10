require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const routes = express.Router();
const auth = require('./routes/auth');
const home = require('./routes/home');

const MONGODB_URI = process.env.URI

mongoose.connect(MONGODB_URI);

app.use('/', home);
app.use('/auth', auth);


app.listen(process.env.PORT || 3000, () => {
  console.log(`\n Server is running`);
});

module.exports = app;