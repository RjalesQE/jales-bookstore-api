const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { db, uuidv4 } = require('../db');
const { authenticate, generateToken } = require('../auth');

// POST /Account/v1/User — Create user
router.post('/v1/User', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({
      code: '1200',
      message: 'UserName and Password required.'
    });
  }

  // Password validation: min 8 chars, upper, lower, number, special
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!pwdRegex.test(password)) {
    return res.status(400).json({
      code: '1300',
      message: 'Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.'
    });
  }

  const existing = Object.values(db.users).find(u => u.username === userName);
  if (existing) {
    return res.status(406).json({
      code: '1204',
      message: 'User exists!'
    });
  }

  const userId = uuidv4();
  const hashed = await bcrypt.hash(password, 10);

  db.users[userId] = {
    userId,
    username: userName,
    password: hashed,
    books: []
  };

  return res.status(201).json({
    userID: userId,
    username: userName,
    books: []
  });
});

// POST /Account/v1/GenerateToken — Generate JWT
router.post('/v1/GenerateToken', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({
      code: '1200',
      message: 'UserName and Password required.'
    });
  }

  const user = Object.values(db.users).find(u => u.username === userName);

  if (!user) {
    return res.status(200).json({
      token: null,
      expires: null,
      status: 'Failed',
      result: 'User not found!'
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(200).json({
      token: null,
      expires: null,
      status: 'Failed',
      result: 'User name or password is incorrect!'
    });
  }

  const token = generateToken({ userId: user.userId, username: user.username });
  const expires = new Date(Date.now() + 3600 * 1000).toISOString();

  return res.status(200).json({
    token,
    expires,
    status: 'Success',
    result: 'User authorized successfully.'
  });
});

// POST /Account/v1/Authorized — Check if user is authorized
router.post('/v1/Authorized', authenticate, (req, res) => {
  return res.status(200).json(true);
});

// GET /Account/v1/User/:UUID — Get user by ID
router.get('/v1/User/:UUID', authenticate, (req, res) => {
  const user = db.users[req.params.UUID];

  if (!user) {
    return res.status(401).json({
      code: '1207',
      message: 'User not found!'
    });
  }

  if (req.user.userId !== req.params.UUID) {
    return res.status(401).json({
      code: '1200',
      message: 'User not authorized!'
    });
  }

  const books = user.books.map(isbn => db.books.find(b => b.isbn === isbn)).filter(Boolean);

  return res.status(200).json({
    userId: user.userId,
    username: user.username,
    books
  });
});

// DELETE /Account/v1/User/:UUID — Delete user
router.delete('/v1/User/:UUID', authenticate, (req, res) => {
  const user = db.users[req.params.UUID];

  if (!user) {
    return res.status(200).json({
      code: '1207',
      message: 'User Id not correct!'
    });
  }

  if (req.user.userId !== req.params.UUID) {
    return res.status(401).json({
      code: '1200',
      message: 'User not authorized!'
    });
  }

  delete db.users[req.params.UUID];
  return res.status(204).send();
});

module.exports = router;
