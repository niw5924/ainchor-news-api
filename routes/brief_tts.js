const express = require('express');
const { openai } = require('../gpt');

const router = express.Router();

router.post('/convert', async (req, res) => {
  try {
    const { anchorName, text } = req.body;
    console.log('[brief-tts] received anchorName:', anchorName);
    const result = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: '제공된 내용을 바탕으로 핵심 정보만 추출하여, 뉴스에서 정보를 전달하는 뉘앙스로 한국어 5문장으로 작성: ' + text
    });
    const summary = result.output_text;
    console.log('[brief-tts] summary:', summary);
    res.json({ success: true, message: summary });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
