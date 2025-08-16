const Groq = require('groq-sdk');
const config = require('../config');

// Initialize Groq client
const groq = new Groq({
  apiKey: config.GROQ_API_KEY
});

// Chat with AI companion
const chatWithAI = async (req, res) => {
  try {
    const { message, companionName, subject, personality } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Create system prompt based on companion details
    const systemPrompt = `You are ${companionName || 'an AI tutor'}, an educational AI companion specializing in ${subject || 'general subjects'}. 
Your personality: ${personality || 'helpful, patient, and encouraging'}.
You help students learn by:
- Providing clear, step-by-step explanations
- Asking follow-up questions to check understanding
- Encouraging critical thinking
- Being patient and supportive
- Adapting your teaching style to the student's level

Keep responses educational, engaging, and appropriate for learning. Always maintain your character as ${companionName || 'an AI tutor'}.`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama3-8b-8192", // Using Llama 3 8B model
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      stream: false
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message: 'Failed to get AI response'
      });
    }

    res.json({
      success: true,
      data: {
        message: aiResponse,
        companionName: companionName || 'AI Tutor',
        subject: subject || 'General',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    
    if (error.message.includes('API key')) {
      return res.status(401).json({
        success: false,
        message: 'Groq API key not configured. Please set GROQ_API_KEY environment variable.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to process chat request'
    });
  }
};

// Get chat history (placeholder for future implementation)
const getChatHistory = async (req, res) => {
  try {
    // TODO: Implement chat history storage in MongoDB
    res.json({
      success: true,
      data: {
        messages: [],
        message: 'Chat history feature coming soon'
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat history'
    });
  }
};

module.exports = {
  chatWithAI,
  getChatHistory
};
