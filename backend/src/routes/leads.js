const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const query = { orderBy: { createdAt: 'desc' } };
    
    if (status) query.where = { status };

    const leads = await prisma.lead.findMany(query);
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, status } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        status: status || 'New',
      },
    });
    
    res.status(201).json(newLead);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

module.exports = router;
