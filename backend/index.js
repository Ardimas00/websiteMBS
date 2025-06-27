// Basic Express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from NodeJS Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
