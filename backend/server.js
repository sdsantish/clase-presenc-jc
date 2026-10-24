require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(express.json({ limit: '50kb' }));

app.get('/api/health', async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ api: 'connected', database: 'disconnected' });
  }
  try {
    await mongoose.connection.db.collection('usuarios').findOne({}, { projection: { _id: 1 } });
    return res.json({ api: 'connected', database: 'connected' });
  } catch (error) {
    const message = error.code === 13 || error.code === 18
      ? 'MongoDB exige autenticación. Configura MONGODB_URI en backend/.env.'
      : 'MongoDB no permite consultar la colección usuarios.';
    return res.status(503).json({ api: 'connected', database: 'error', message });
  }
});

app.use('/api/usuarios', usuariosRouter);

app.use((error, _req, res, _next) => {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError || error instanceof SyntaxError) {
    return res.status(400).json({ message: error.message });
  }
  if (error.code === 13 || error.code === 18) {
    return res.status(503).json({ message: 'MongoDB rechazó la autenticación. Revisa MONGODB_URI en backend/.env.' });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'MongoDB no está disponible. Revisa MONGODB_URI y que la base esté iniciada.' });
  }
  console.error(error);
  return res.status(500).json({ message: 'Ocurrió un error interno en la API.' });
});

async function start() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jovenes_creativos';
  await mongoose.connect(mongoUri);
  app.listen(port, () => console.log(`API lista en http://localhost:${port}`));
}

start().catch((error) => {
  console.error(`No se pudo iniciar la API: ${error.message}`);
  process.exit(1);
});

async function close() {
  await mongoose.disconnect();
  process.exit(0);
}

process.on('SIGINT', close);
process.on('SIGTERM', close);