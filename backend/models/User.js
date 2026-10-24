const mongoose = require('mongoose');

const rolesByProfile = {
  dulce: ['cliente', 'admin'],
  ropa: ['comprador', 'vendedor'],
  tutorias: ['estudiante', 'tutor'],
  mascotas: ['dueño', 'cuidador'],
  artesanias: ['cliente', 'artesano']
};

const defaultRoleByProfile = {
  dulce: 'cliente',
  ropa: 'comprador',
  tutorias: 'estudiante',
  mascotas: 'dueño',
  artesanias: 'cliente'
};

const userSchema = new mongoose.Schema({
  profileKey: {
    type: String,
    required: true,
    enum: Object.keys(rolesByProfile)
  },
  nombre: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no tiene un formato válido.']
  },
  edad: { type: Number, min: [14, 'La edad mínima es 14.'] },
  intereses: { type: [{ type: String, trim: true }], default: undefined },
  activo: {
    type: Boolean,
    default() { return ['dulce', 'tutorias'].includes(this.profileKey) ? true : undefined; }
  },
  ciudad: { type: String, trim: true },
  talla: { type: String, trim: true },
  compraFrecuente: {
    type: Boolean,
    default() { return this.profileKey === 'ropa' ? false : undefined; }
  },
  grado: {
    type: Number,
    min: [6, 'El grado mínimo es 6.'],
    max: [11, 'El grado máximo es 11.'],
    required() { return this.profileKey === 'tutorias'; }
  },
  materias: { type: [{ type: String, trim: true }], default: undefined },
  telefono: { type: String, trim: true },
  tipoMascota: {
    type: String,
    enum: { values: ['perro', 'gato', 'otro'], message: 'El tipo de mascota debe ser perro, gato u otro.' },
    required() { return this.profileKey === 'mascotas'; }
  },
  tieneJardin: {
    type: Boolean,
    default() { return this.profileKey === 'mascotas' ? false : undefined; }
  },
  municipio: { type: String, trim: true },
  verificado: {
    type: Boolean,
    default() { return this.profileKey === 'artesanias' ? false : undefined; }
  },
  rol: {
    type: String,
    required: true,
    default() { return defaultRoleByProfile[this.profileKey]; },
    validate: {
      validator(value) { return rolesByProfile[this.profileKey]?.includes(value) || false; },
      message: 'El rol no está permitido para este caso.'
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform(_document, result) {
      result.id = result._id.toString();
      delete result._id;
      delete result.__v;
      return result;
    }
  }
});

userSchema.index({ profileKey: 1, createdAt: -1 });

module.exports = mongoose.model('Usuario', userSchema);