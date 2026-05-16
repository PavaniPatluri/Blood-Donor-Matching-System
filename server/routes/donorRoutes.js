const express = require('express');
const router = express.Router();

// Mock data for matching
const donors = [
  { id: 1, name: 'John Doe', bloodGroup: 'O-', location: 'Sector 1', status: 'Available' },
  { id: 2, name: 'Jane Smith', bloodGroup: 'A+', location: 'Sector 4', status: 'Available' },
];

router.get('/match', (req, res) => {
  const { bloodGroup } = req.query;
  const matches = donors.filter(d => d.bloodGroup === bloodGroup);
  res.json({ matches });
});

router.post('/broadcast', (req, res) => {
  const { requestId } = req.body;
  res.json({ status: 'success', message: 'Broadcast sent to nearby donors' });
});

module.exports = router;
