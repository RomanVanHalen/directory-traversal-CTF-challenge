const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/file', (req, res) => {
  const filename = req.query.name;
  if (!filename) return res.send('Filename required');

  // ❌ Vulnerable path handling
  const filePath = path.join(__dirname, 'public', filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
