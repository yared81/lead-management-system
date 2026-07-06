const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Placeholder routes
router.get('/', (req, res) => {
  res.json([]);
});

router.post('/', (req, res) => {
  res.json({ message: 'Lead created' });
});

module.exports = router;
