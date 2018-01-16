/* eslint-disable no-console */
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/production')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/production/index.html'));
});

app.listen(PORT, () => {
  console.log('App is running on port: ', PORT);
});
