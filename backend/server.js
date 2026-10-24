const express = require('express');

const app = express();
const port = Number(process.env.PORT) || 5001;
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend disponible en http://localhost:${port}`);
});