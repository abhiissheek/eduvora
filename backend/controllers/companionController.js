const mongoose = require('mongoose');

// Companion schema
const companionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  difficulty_level: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  teaching_style: {
    type: String,
    required: true,
    enum: ['socratic', 'visual', 'practical', 'encouraging', 'analytical']
  },
  personality_traits: {
    type: String,
    required: true
  },
  custom_instructions: {
    type: String,
    default: ''
  },
  learning_objectives: {
    type: String,
    default: ''
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Companion = mongoose.model('Companion', companionSchema);

// Create a new companion
const createCompanion = async (req, res) => {
  try {
    const {
      name,
      subject,
      difficulty_level,
      teaching_style,
      personality_traits,
      custom_instructions,
      learning_objectives
    } = req.body;

    // Validate required fields
    if (!name || !subject || !difficulty_level || !teaching_style || !personality_traits) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, subject, difficulty_level, teaching_style, personality_traits'
      });
    }

    // Create new companion
    const companion = new Companion({
      user_id: req.user._id,
      name,
      subject,
      difficulty_level,
      teaching_style,
      personality_traits,
      custom_instructions: custom_instructions || '',
      learning_objectives: learning_objectives || '',
      is_active: true
    });

    await companion.save();

    res.status(201).json({
      success: true,
      data: companion
    });
  } catch (error) {
    console.error('Error creating companion:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating companion'
    });
  }
};

// Get all companions for a user
const getCompanions = async (req, res) => {
  try {
    const companions = await Companion.find({ 
      user_id: req.user._id,
      is_active: true 
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: companions
    });
  } catch (error) {
    console.error('Error fetching companions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching companions'
    });
  }
};

// Get a specific companion
const getCompanion = async (req, res) => {
  try {
    const { id } = req.params;

    const companion = await Companion.findOne({
      _id: id,
      user_id: req.user._id,
      is_active: true
    });

    if (!companion) {
      return res.status(404).json({
        success: false,
        message: 'Companion not found'
      });
    }

    res.status(200).json({
      success: true,
      data: companion
    });
  } catch (error) {
    console.error('Error fetching companion:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching companion'
    });
  }
};

// Update a companion
const updateCompanion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const companion = await Companion.findOneAndUpdate(
      { _id: id, user_id: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!companion) {
      return res.status(404).json({
        success: false,
        message: 'Companion not found'
      });
    }

    res.status(200).json({
      success: true,
      data: companion
    });
  } catch (error) {
    console.error('Error updating companion:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating companion'
    });
  }
};

// Delete a companion (soft delete)
const deleteCompanion = async (req, res) => {
  try {
    const { id } = req.params;

    const companion = await Companion.findOneAndUpdate(
      { _id: id, user_id: req.user._id },
      { is_active: false },
      { new: true }
    );

    if (!companion) {
      return res.status(404).json({
        success: false,
        message: 'Companion not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Companion deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting companion:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting companion'
    });
  }
};

module.exports = {
  createCompanion,
  getCompanions,
  getCompanion,
  updateCompanion,
  deleteCompanion
};
