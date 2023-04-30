const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { default: mongoose } = require('mongoose');
const axios = require('axios');

//load env vars
dotenv.config({ path: './config/.env' });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Enable cors
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/v2/stores', require('./routes/stores'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
