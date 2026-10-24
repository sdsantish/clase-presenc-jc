# Backend · Clase S21

## Ejecutar localmente

1. Desde esta carpeta, instala las dependencias: `npm install`.
2. Inicia el servidor vacío: `npm start`.
3. Express escucha en `http://localhost:5001`.

El servidor solo ocupa el puerto. No contiene rutas, modelos, conexión a base de datos ni lógica de aplicación.

## Trabajo por realizar

- Crear las rutas REST para listar, consultar, registrar, actualizar y eliminar usuarios.
- Crear el esquema de usuario con tipos, campos obligatorios, límites, opciones y valores predeterminados.
- Conectar Mongoose a MongoDB usando una variable de entorno; nunca guardar credenciales en el código.
- Devolver los códigos HTTP adecuados: `201` al crear, `400` para datos inválidos y `404` cuando no existe el usuario.
- Conectar las rutas a las operaciones de persistencia.

Mantén este servidor local durante el desarrollo del frontend. El proxy de Vite reenvía `/api` al puerto `5001`.