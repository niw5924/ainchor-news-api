const express = require('express');

const router = express.Router();

router.post('/convert', (req, res) => {
  try {
    const { text } = req.body;
    console.log('[brief-tts] received text:', text);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
