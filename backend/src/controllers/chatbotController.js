const pool = require('../config/db');
const chatbotService = require('../services/chatbotService');

exports.sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tin nhắn.'
      });
    }

    const botResponse = await chatbotService.getResponse(message);

    try {
      await pool.query(
        'INSERT INTO chatbot_logs (user_message, bot_response) VALUES (?, ?)',
        [message, botResponse]
      );
    } catch (logError) {
      console.warn(`[chatbot] Could not save chat log: ${logError.message}`);
    }

    res.json({
      success: true,
      message: 'OK',
      data: { reply: botResponse }
    });
  } catch (error) {
    next(error);
  }
};
