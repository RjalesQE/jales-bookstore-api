const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'jales-bookstore-secret-key-2024';

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ code: '1200', message: 'User not authorized!' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ code: '1200', message: 'User not authorized!' });
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

module.exports = { authenticate, generateToken };
