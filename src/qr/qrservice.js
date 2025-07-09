const QRCode = require('qrcode');
const fs = require('fs');

function generateQR(identity, outputFile = 'identity_qr.png') {
  const base64Data = Buffer.from(JSON.stringify(identity)).toString('base64');

  QRCode.toFile(outputFile, base64Data, function (err) {
    if (err) throw err;
    console.log(`✅ QR code saved as ${outputFile}`);
  });
}

module.exports = { generateQR };
