const express = require('express');
const briefTTSRoutes = require('./routes/brief_tts');

const app = express();

app.use(express.json());
app.use('/api/brief-tts', briefTTSRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log('ainchor_news_api on http://0.0.0.0:3000');
});
