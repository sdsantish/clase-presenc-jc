export const profiles = {
  dulce: {
    name: 'Dulce Horno', subtitle: 'Repostería artesanal en Medellín', roleDefault: 'cliente', roleOptions: ['cliente', 'admin'],
    products: [
      { name: 'Torta de chocolate', description: 'Bizcocho húmedo con ganache', price: 45000, icon: '🍰', color: '#f4ded3', kind: 'Favorita de la casa' },
      { name: 'Galletas de avena', description: 'Caja x 12, horneadas cada mañana', price: 18000, icon: '🍪', color: '#f4e9c7', kind: 'Para compartir' },
      { name: 'Cupcakes de vainilla', description: 'Caja x 6 con crema suave', price: 30000, icon: '🧁', color: '#e3e9d9', kind: 'Hechos a mano' }
    ],
    fields: [
      { key: 'nombre', label: 'Nombre', type: 'text', required: true, sample: 'Camila Ruiz' },
      { key: 'email', label: 'Email', type: 'email', required: true, sample: 'camila@correo.com' },
      { key: 'edad', label: 'Edad', type: 'number', min: 14, sample: 17 },
      { key: 'intereses', label: 'Intereses (separa con comas)', type: 'list', sample: ['tortas', 'galletas'] },
      { key: 'activo', label: 'Cuenta activa', type: 'boolean', sample: true }
    ],
    schema: ["nombre: { type: String, required: true }", "email: { type: String, required: true }", "edad: { type: Number, min: 14 }", "intereses: [String]", "activo: { type: Boolean, default: true }", "rol: { type: String, enum: ['cliente', 'admin'], default: 'cliente' }"]
  },
  ropa: {
    name: 'Segunda Vuelta', subtitle: 'Ropa de segunda mano seleccionada', roleDefault: 'comprador', roleOptions: ['comprador', 'vendedor'],
    products: [
      { name: 'Chaqueta de jean', description: 'Clásica, en excelente estado', price: 60000, icon: '🧥', color: '#dce8e7', kind: 'Talla única' },
      { name: 'Vestido de flores', description: 'Tela ligera, ideal para el día', price: 45000, icon: '👗', color: '#f2dfe0', kind: 'Segunda vida' },
      { name: 'Tenis blancos', description: 'Cómodos para todos los días', price: 70000, icon: '👟', color: '#e8e8df', kind: 'Buen estado' }
    ],
    fields: [
      { key: 'nombre', label: 'Nombre', type: 'text', required: true, sample: 'Camila Ruiz' },
      { key: 'email', label: 'Email', type: 'email', required: true, sample: 'camila@correo.com' },
      { key: 'ciudad', label: 'Ciudad', type: 'text', sample: 'Medellín' },
      { key: 'talla', label: 'Talla', type: 'text', sample: 'M' },
      { key: 'edad', label: 'Edad', type: 'number', min: 14, sample: 17 },
      { key: 'intereses', label: 'Intereses (separa con comas)', type: 'list', sample: ['ropa vintage', 'calzado'] },
      { key: 'compraFrecuente', label: 'Compra frecuente', type: 'boolean', sample: true }
    ],
    schema: ["nombre: { type: String, required: true }", "email: { type: String, required: true }", "edad: { type: Number, min: 14 }", "intereses: [String]", "compraFrecuente: { type: Boolean, default: false }", "rol: { type: String, enum: ['comprador', 'vendedor'], default: 'comprador' }"]
  },
  tutorias: {
    name: 'Aprende Juntos', subtitle: 'Tutorías para avanzar con confianza', roleDefault: 'estudiante', roleOptions: ['estudiante', 'tutor'],
    products: [
      { name: 'Matemáticas', description: 'Una hora para resolver dudas', price: 30000, icon: '📐', color: '#e0e9dc', kind: 'Clase individual' },
      { name: 'Inglés', description: 'Práctica y conversación guiada', price: 35000, icon: '📚', color: '#f3e8cb', kind: 'Clase individual' },
      { name: 'Paquete 4 clases', description: 'Acompañamiento durante el mes', price: 110000, icon: '✏️', color: '#e7dfed', kind: 'Ahorra $30.000' }
    ],
    fields: [
      { key: 'nombre', label: 'Nombre', type: 'text', required: true, sample: 'Mateo Pérez' },
      { key: 'email', label: 'Email', type: 'email', required: true, sample: 'mateo@correo.com' },
      { key: 'grado', label: 'Grado', type: 'number', min: 6, max: 11, required: true, sample: 8 },
      { key: 'materias', label: 'Materias (separa con comas)', type: 'list', sample: ['matemáticas', 'inglés'] },
      { key: 'activo', label: 'Cuenta activa', type: 'boolean', sample: true }
    ],
    schema: ["nombre: { type: String, required: true }", "email: { type: String, required: true }", "grado: { type: Number, min: 6, max: 11, required: true }", "materias: [String]", "activo: { type: Boolean, default: true }", "rol: { type: String, enum: ['estudiante', 'tutor'], default: 'estudiante' }"]
  },
  mascotas: {
    name: 'Patitas Felices', subtitle: 'Cuidado cercano para cada mascota', roleDefault: 'dueño', roleOptions: ['dueño', 'cuidador'],
    products: [
      { name: 'Paseo', description: 'Un paseo con tiempo para explorar', price: 15000, icon: '🐕', color: '#e6ebd8', kind: 'Por salida' },
      { name: 'Baño', description: 'Baño y cepillado con cuidado', price: 40000, icon: '🫧', color: '#dcebed', kind: 'Cuidado completo' },
      { name: 'Guardería', description: 'Un día acompañado y activo', price: 50000, icon: '🐈', color: '#f1e2d7', kind: 'Por día' }
    ],
    fields: [
      { key: 'nombre', label: 'Nombre', type: 'text', required: true, sample: 'Sara López' },
      { key: 'email', label: 'Email', type: 'email', required: true, sample: 'sara@correo.com' },
      { key: 'telefono', label: 'Teléfono', type: 'text', sample: '3001234567' },
      { key: 'tipoMascota', label: 'Tipo de mascota', type: 'enum', options: ['perro', 'gato', 'otro'], required: true, sample: 'perro' },
      { key: 'edad', label: 'Edad del usuario', type: 'number', min: 14, sample: 19 },
      { key: 'intereses', label: 'Intereses (separa con comas)', type: 'list', sample: ['paseos', 'cuidado'] },
      { key: 'tieneJardin', label: 'Tiene jardín', type: 'boolean', sample: true }
    ],
    schema: ["nombre: { type: String, required: true }", "email: { type: String, required: true }", "tipoMascota: { type: String, enum: ['perro', 'gato', 'otro'], required: true }", "edad: { type: Number, min: 14 }", "tieneJardin: { type: Boolean, default: false }", "rol: { type: String, enum: ['dueño', 'cuidador'], default: 'dueño' }"]
  },
  artesanias: {
    name: 'Manos del Valle', subtitle: 'Artesanías hechas con historias', roleDefault: 'cliente', roleOptions: ['cliente', 'artesano'],
    products: [
      { name: 'Mochila tejida', description: 'Tejida a mano con fibras resistentes', price: 120000, icon: '🧶', color: '#e7dfcf', kind: 'Pieza artesanal' },
      { name: 'Aretes en chaquira', description: 'Color y detalle en cada par', price: 25000, icon: '🪡', color: '#f2dfd8', kind: 'Hechos a mano' },
      { name: 'Canasto de fique', description: 'Fique natural, tejido localmente', price: 55000, icon: '🧺', color: '#e3e9d7', kind: 'Pieza artesanal' }
    ],
    fields: [
      { key: 'nombre', label: 'Nombre', type: 'text', required: true, sample: 'Ana Torres' },
      { key: 'email', label: 'Email', type: 'email', required: true, sample: 'ana@correo.com' },
      { key: 'municipio', label: 'Municipio', type: 'text', sample: 'Guatapé' },
      { key: 'edad', label: 'Edad', type: 'number', min: 14, sample: 24 },
      { key: 'intereses', label: 'Intereses (separa con comas)', type: 'list', sample: ['tejidos', 'fique'] },
      { key: 'verificado', label: 'Perfil verificado', type: 'boolean', sample: false }
    ],
    schema: ["nombre: { type: String, required: true }", "email: { type: String, required: true }", "municipio: String", "edad: { type: Number, min: 14 }", "intereses: [String]", "verificado: { type: Boolean, default: false }", "rol: { type: String, enum: ['cliente', 'artesano'], default: 'cliente' }"]
  }
};

export function sampleDocument(profile) {
  const document = {};
  profile.fields.forEach((field) => { document[field.key] = field.sample; });
  document.rol = profile.roleDefault;
  return document;
}