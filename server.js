// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./models/User');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // serve index.html

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/aform', async (req, res) => { 
  const { email, password } = req.body;
  const user = new User({ email, password});
  await user.save();

  // Send JSON response
  res.json({ success: true, message: "successful" });
});



app.listen(3000, () => console.log('Server running on http://localhost:3000'));
