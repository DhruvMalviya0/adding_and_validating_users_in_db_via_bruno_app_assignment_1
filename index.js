// index.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const connectDB = require('./db');

const app = express();
const PORT = 5000;

connectDB();
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error('🔥 Registration error:', error); // 👈 log real error
    res.status(500).json({ success: false, message: 'Server error. Try again later.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
