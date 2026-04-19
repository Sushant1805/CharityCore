const express = require('express');
const { body, param } = require('express-validator');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateInput } = require('../middleware/validation');

const router = express.Router();

// Get all campaigns
router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find({});
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create campaign (Admin only)
router.post('/campaigns', protect, admin, [
  body('title').trim().notEmpty().withMessage('Title is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required').escape(),
  body('goalAmount').isNumeric().withMessage('Goal Amount must be a number'),
  validateInput
], async (req, res) => {
  try {
    const { title, description, goalAmount, imageUrl } = req.body;
    const campaign = new Campaign({ title, description, goalAmount, imageUrl });
    const createdCampaign = await campaign.save();
    res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Donate to a campaign (Any logged in user)
router.post('/donate', protect, [
  body('campaignId').notEmpty().withMessage('Campaign ID is required'),
  body('amount').isNumeric().withMessage('Amount must be positive number').custom(value => value > 0),
  body('message').optional().trim().escape(),
  validateInput
], async (req, res) => {
  try {
    const { campaignId, amount, message } = req.body;
    
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const donation = new Donation({
      user: req.user._id,
      campaign: campaignId,
      amount,
      message
    });

    await donation.save();
    
    // Update raised amount
    campaign.raisedAmount += amount;
    await campaign.save();

    res.status(201).json({ message: 'Donation successful', donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
