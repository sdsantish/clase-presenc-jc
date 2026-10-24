const { Router } = require('express');
const mongoose = require('mongoose');
const Usuario = require('../models/User');

const router = Router();
const validProfiles = ['dulce', 'ropa', 'tutorias', 'mascotas', 'artesanias'];

router.get('/', async (req, res) => {
  const { profileKey } = req.query;
  if (profileKey && !validProfiles.includes(profileKey)) {
    return res.status(400).json({ message: 'El caso seleccionado no existe.' });
  }
  const filter = profileKey ? { profileKey } : {};
  const usuarios = await Usuario.find(filter).sort({ createdAt: -1 });
  return res.json(usuarios);
});

router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'El id no tiene un formato válido.' });
  }
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'No existe un usuario con ese id.' });
  return res.json(usuario);
});

router.post('/', async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  return res.status(201).json(usuario);
});

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'El id no tiene un formato válido.' });
  }
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'No existe un usuario con ese id.' });
  if (req.body.profileKey && req.body.profileKey !== usuario.profileKey) {
    return res.status(400).json({ message: 'No se puede cambiar el caso de un usuario existente.' });
  }

  const { profileKey: _profileKey, ...cambios } = req.body;
  usuario.set(cambios);
  await usuario.save();
  return res.json(usuario);
});

router.delete('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'El id no tiene un formato válido.' });
  }
  const usuario = await Usuario.findByIdAndDelete(req.params.id);
  if (!usuario) return res.status(404).json({ message: 'No existe un usuario con ese id.' });
  return res.status(204).end();
});

module.exports = router;