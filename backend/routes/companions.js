const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createCompanion,
  getCompanions,
  getCompanion,
  updateCompanion,
  deleteCompanion
} = require('../controllers/companionController');

// @route   POST /api/companions
// @desc    Create a new AI companion
// @access  Private
router.post('/', protect, createCompanion);

// @route   GET /api/companions
// @desc    Get all companions for the authenticated user
// @access  Private
router.get('/', protect, getCompanions);

// @route   GET /api/companions/:id
// @desc    Get a specific companion
// @access  Private
router.get('/:id', protect, getCompanion);

// @route   PUT /api/companions/:id
// @desc    Update a companion
// @access  Private
router.put('/:id', protect, updateCompanion);

// @route   DELETE /api/companions/:id
// @desc    Delete a companion (soft delete)
// @access  Private
router.delete('/:id', protect, deleteCompanion);

module.exports = router;
