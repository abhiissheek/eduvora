const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const { chatWithAI, getChatHistory } = require('../controllers/chatController');

const router = express.Router();

// @route   POST /api/chat
// @desc    Chat with AI companion
// @access  Private
router.post('/', [
  protect,
  body('message', 'Message is required').notEmpty()
], chatWithAI);

// @route   GET /api/chat/history
// @desc    Get chat history
// @access  Private
router.get('/history', protect, getChatHistory);

module.exports = router;
