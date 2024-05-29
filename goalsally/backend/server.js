const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiter to all requests
app.use(limiter);

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).send('User created');
});

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ token });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
