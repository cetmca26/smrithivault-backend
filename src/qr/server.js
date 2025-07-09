const express = require('express');
const bodyParser = require('body-parser');
const { generateQR } = require('./qrservice');
const { extractFields } = require('./extractor');

const app = express();
app.use(bodyParser.json());

// Replace dummy with dynamic data from backend
app.post('/generateQR', (req, res) => {
  const { fullIdentity, requestedFields, fileName } = req.body;

  if (!fullIdentity || !Array.isArray(requestedFields)) {
    return res.status(400).json({ error: "fullIdentity and requestedFields required." });
  }

  const filteredData = extractFields(fullIdentity, requestedFields);
  const file = fileName || `QR_${Date.now()}.png`;

  generateQR(filteredData, file);

  res.json({
    message: "✅ QR generated successfully",
    file,
    filteredData
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
