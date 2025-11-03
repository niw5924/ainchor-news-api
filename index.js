const express = require('express');

const app = express();

app.listen(3000, '0.0.0.0', () => {
  console.log('ainchor_news_api on http://0.0.0.0:3000');
});
