const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { authenticate } = require('../auth');

// GET /BookStore/v1/Books — List all books
router.get('/v1/Books', (req, res) => {
  return res.status(200).json({ books: db.books });
});

// GET /BookStore/v1/Book — Get book by ISBN
router.get('/v1/Book', (req, res) => {
  const { ISBN } = req.query;

  if (!ISBN) {
    return res.status(400).json({
      code: '1200',
      message: 'ISBN required.'
    });
  }

  const book = db.books.find(b => b.isbn === ISBN);

  if (!book) {
    return res.status(400).json({
      code: '1205',
      message: 'ISBN supplied is not available in Books Collection!'
    });
  }

  return res.status(200).json(book);
});

// POST /BookStore/v1/Books — Add books to user collection
router.post('/v1/Books', authenticate, (req, res) => {
  const { userId, collectionOfIsbns } = req.body;

  if (!userId || !collectionOfIsbns || !Array.isArray(collectionOfIsbns)) {
    return res.status(400).json({
      code: '1200',
      message: 'userId and collectionOfIsbns are required.'
    });
  }

  if (req.user.userId !== userId) {
    return res.status(401).json({
      code: '1200',
      message: 'User not authorized!'
    });
  }

  const user = db.users[userId];

  if (!user) {
    return res.status(401).json({
      code: '1207',
      message: 'User not found!'
    });
  }

  const added = [];
  const failed = [];

  for (const item of collectionOfIsbns) {
    const isbn = item.isbn;
    const bookExists = db.books.find(b => b.isbn === isbn);

    if (!bookExists) {
      failed.push({ isbn, message: 'ISBN not found in Books collection.' });
      continue;
    }

    if (user.books.includes(isbn)) {
      failed.push({ isbn, message: 'ISBN already present in the User\'s Collection!' });
      continue;
    }

    user.books.push(isbn);
    added.push({ isbn });
  }

  if (added.length === 0) {
    return res.status(400).json({
      code: '1210',
      message: failed[0]?.message || 'ISBN already present in the User\'s Collection!'
    });
  }

  return res.status(201).json({ books: added });
});

// DELETE /BookStore/v1/Book — Remove a book from user collection
router.delete('/v1/Book', authenticate, (req, res) => {
  const { isbn, userId } = req.body;

  if (!isbn || !userId) {
    return res.status(400).json({
      code: '1200',
      message: 'userId and ISBN are required.'
    });
  }

  if (req.user.userId !== userId) {
    return res.status(401).json({
      code: '1200',
      message: 'User not authorized!'
    });
  }

  const user = db.users[userId];

  if (!user) {
    return res.status(401).json({
      code: '1207',
      message: 'User not found!'
    });
  }

  const idx = user.books.indexOf(isbn);

  if (idx === -1) {
    return res.status(400).json({
      code: '1206',
      message: 'ISBN supplied is not available in User\'s Collection!'
    });
  }

  user.books.splice(idx, 1);
  return res.status(204).send();
});

// DELETE /BookStore/v1/Books — Remove all books from user collection
router.delete('/v1/Books', authenticate, (req, res) => {
  const { UserId } = req.query;

  if (!UserId) {
    return res.status(400).json({
      code: '1200',
      message: 'UserId query param is required.'
    });
  }

  if (req.user.userId !== UserId) {
    return res.status(401).json({
      code: '1200',
      message: 'User not authorized!'
    });
  }

  const user = db.users[UserId];

  if (!user) {
    return res.status(401).json({
      code: '1207',
      message: 'User not found!'
    });
  }

  user.books = [];
  return res.status(204).send();
});

// PUT /BookStore/v1/Books/:ISBN — Replace a book in user collection
router.put('/v1/Books/:ISBN', authenticate, (req, res) => {
  const { ISBN } = req.params;
  const { userId, isbn: newIsbn } = req.body;

  if (!userId || !newIsbn) {
    return res.status(400).json({
      code: '1200',
      message: 'userId and isbn are required.'
    });
  }

  if (req.user.userId !== userId) {
    return res.status(401).json({
      code: '1200',
      message: 'User not authorized!'
    });
  }

  const user = db.users[userId];

  if (!user) {
    return res.status(401).json({
      code: '1207',
      message: 'User not found!'
    });
  }

  const oldIdx = user.books.indexOf(ISBN);
  if (oldIdx === -1) {
    return res.status(400).json({
      code: '1206',
      message: 'ISBN supplied is not available in User\'s Collection!'
    });
  }

  const newBookExists = db.books.find(b => b.isbn === newIsbn);
  if (!newBookExists) {
    return res.status(400).json({
      code: '1205',
      message: 'ISBN supplied is not available in Books Collection!'
    });
  }

  if (user.books.includes(newIsbn)) {
    return res.status(400).json({
      code: '1210',
      message: 'ISBN already present in the User\'s Collection!'
    });
  }

  user.books[oldIdx] = newIsbn;

  return res.status(200).json({
    userId: user.userId,
    username: user.username,
    books: user.books.map(isbn => db.books.find(b => b.isbn === isbn)).filter(Boolean)
  });
});

module.exports = router;
