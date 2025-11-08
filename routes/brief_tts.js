const express = require('express');
const { openai } = require('../gpt');
const { PollyClient, SynthesizeSpeechCommand } = require('@aws-sdk/client-polly');
require('dotenv').config();

const router = express.Router();
const polly = new PollyClient({ region: process.env.AWS_REGION });
const voiceIdMap = { '지혜': 'Jihye', '서연': 'Seoyeon' };

router.post('/summary', async (req, res) => {
  try {
    const { text } = req.body;
    const result = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: '제공된 내용을 바탕으로 핵심 정보만 추출하여, 뉴스에서 정보를 전달하는 뉘앙스로 한국어 5문장으로 작성: ' + text
    });
    const summary = result.output_text;
    res.json({ success: true, summary: summary });
  } catch (err) {
    console.log('[summary] error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/tts', async (req, res) => {
  try {
    const { anchorName, summary } = req.body;
    const out = await polly.send(new SynthesizeSpeechCommand({
      Text: summary,
      OutputFormat: 'mp3',
      SampleRate: '22050',
      VoiceId: voiceIdMap[anchorName],
      Engine: 'neural',
      TextType: 'text'
    }));
    res.setHeader('Content-Type', 'audio/mpeg');
    out.AudioStream.pipe(res);
  } catch (err) {
    console.log('[tts] error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
