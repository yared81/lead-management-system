const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /leads → Fetch all leads
router.get('/', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// POST /leads → Add a new lead
router.post('/', async (req, res) => {
  try {
    const { name, email, status } = req.body;
    
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        // Prisma will default to 'New' if status is undefined, 
        // but we pass it explicitly if provided
        status: status || 'New',
      },
    });
    res.status(201).json(newLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

module.exports = router;
