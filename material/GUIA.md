# Ejemplo integrador: el viaje completo de un dato

Este material acompaña la sesión S21 descrita en [`../clase.html`](../clase.html). La aplicación React está en [`../frontend`](../frontend) y el backend Express/Mongoose en [`../backend`](../backend).

## Qué incluye el ejemplo

La app implementa el frontend y el recorrido de datos completo hasta MongoDB. Las cuatro piezas se relacionan así:

| Pieza | En el restaurante | Qué puedes probar |
| --- | --- | --- |
| React | El comedor y la carta | Componentes, props, state, tres tarjetas y pedido interactivo con opción para vaciar. |
| Express | Los meseros | El backend expone `GET`, `POST`, `PUT` y `DELETE` bajo `/api/usuarios`. |
| Mongoose | El control de calidad | El modelo `Usuario` valida los campos requeridos, tipos, rangos, roles y opciones del caso. |
| MongoDB | La despensa | Mongoose persiste los usuarios en la base configurada mediante `MONGODB_URI`. |

Selecciona un caso para cambiar productos, documento, campos, roles y reglas. El formulario usa la API real para consultar, crear, actualizar y eliminar documentos MongoDB.

> **Implementación:** React consume Express, Express guarda y consulta mediante Mongoose, y MongoDB persiste los usuarios. Las URI y credenciales se configuran fuera del código fuente. La vitrina es frontend; el CRUD real es el de usuarios.

### API implementada

El backend de `backend/` expone estas rutas reales:

| Método | Ruta | Respuesta principal |
| --- | --- | --- |
| `GET` | `/api/usuarios?profileKey=dulce` | Lista documentos del caso. |
| `GET` | `/api/usuarios/:id` | Devuelve un documento o `404`. |
| `POST` | `/api/usuarios` | Valida con Mongoose, guarda y devuelve `201`; errores de esquema devuelven `400`. |
| `PUT` | `/api/usuarios/:id` | Actualiza y ejecuta validación Mongoose al llamar `save()`; devuelve `404` si no existe. |
| `DELETE` | `/api/usuarios/:id` | Elimina el documento o devuelve `404`. |
| `GET` | `/api/health` | Informa si la API y la conexión a MongoDB están activas. |

El modelo se define en `backend/models/User.js`. `profileKey` selecciona las reglas del caso; los roles tienen opciones y valores predeterminados propios. La respuesta JSON usa `id` y omite `_id`/`__v`.

## Mapeo de la clase, item por item

### Datos generales, objetivos y analogía

- **Módulo y sesiones previas:** S21 integra MongoDB y CRUD (S18), Mongoose y Express (S19), y componentes, JSX, props y state de React (S20).
- **Objetivo 1, documento y CRUD:** en “Usuarios y reglas” aparece un documento JSON con texto, número, booleano y lista. Las rutas y acciones permiten asociar `insertOne`, `find`, `updateOne` y `deleteOne` con crear, leer, actualizar y eliminar.
- **Objetivo 2, reglas y códigos HTTP:** el formulario valida campos obligatorios, formato de correo, `min`, `max` y `enum`; el panel del recorrido explica `201`, `400` y `404` como respuestas del backend de clase.
- **Objetivo 3, página React:** “El comedor” muestra el nombre del emprendimiento, tres productos con nombre, descripción y precio, y un botón que cambia el contador.
- **Objetivo 4, recorrido:** “Viaje del dato” describe React → Express → Mongoose → MongoDB y permite analizar pedidos aceptados y rechazados.
- **Analogía:** React es el comedor; Express son los meseros; Mongoose es el control de calidad; MongoDB es la despensa. Usa el mismo emprendimiento en las tres estaciones para que los campos mantengan el hilo.
- **Alcance:** la clase no exige conectar la API, pero este ejemplo sí implementa esa extensión para mostrar el recorrido completo. No contiene credenciales; cada entorno configura su propia URI de MongoDB.

### Agenda de 180 minutos y checkpoints

La agenda principal suma 170 minutos y conserva 10 minutos de holgura; no se agrega contenido para llenar ese margen.

| Bloque de clase | Tiempo | Evidencia o uso del ejemplo |
| --- | ---: | --- |
| 0. Check-in de avance del proyecto | 15 min | Preguntar qué funciona, qué falta y qué bloquea. Registrar quién guardó la página de S20 y derivar problemas de cuentas o Git a mentoría entre sesiones. |
| 1. Calentamiento: verdadero o falso | 15 min | Antes de abrir la app, repasar predicciones sobre documentos, colecciones, rutas, esquema y state. Pedir el porqué antes de revelar. |
| Estación 1. La despensa: MongoDB | 30 min | Corregir el documento, identificar operaciones CRUD y escribir un documento propio. La app deja comparar un documento bien tipado. |
| Pausa activa | 10 min | Estiramiento y conversación entre estudiantes; no es una actividad de programación. |
| Estación 2. El control de calidad: Mongoose y Express | 30 min | Predecir aceptaciones y rechazos, escribir un esquema propio y revisar las rutas API. |
| Estación 3. El comedor: React | 40 min | Adaptar encabezado y productos, probar los botones y mostrar la página en una galería. |
| Bloque 5. El viaje de un pedido | 20 min | Asignar los cuatro roles, recorrer pedidos válidos e inválidos y preguntar dónde se detuvo cada uno y qué ve React. No recortar este bloque. |
| Cierre | 10 min | Guardar el trabajo, responder la plenaria y elegir qué pieza continuar en el proyecto. |

**Checkpoints visibles para el mentor:**

1. Checkpoint 1: documento de usuario del emprendimiento, sin errores, guardado en el editor.
2. Checkpoint 2: esquema de usuario con al menos tres reglas.
3. Checkpoint 3: página React con encabezado y tres tarjetas propias.
4. Checkpoint 4: botón con state funcionando en las tarjetas.

**Recorte si hay retraso:** acortar la pausa a cinco minutos; luego quitar la galería y mostrar al vecino; por último, pasar el esquema propio de Estación 2 a reto en casa. Mantener el viaje del dato.

### Bloque 0: check-in

Preguntas guía: ¿qué parte del proyecto final ya funciona?, ¿qué falta y qué lo frena?, ¿está guardada la página de S20?, ¿recuerda el acceso a StackBlitz, GitHub o Atlas? Anota bloqueos y quién necesita reconstruir la página. No resuelvas problemas de cuenta durante esta sesión.

### Bloque 1: calentamiento

El formato de la clase es verdadero/falso con el cuerpo: el grupo se pone de pie o se sienta, explica su decisión y escucha la corrección. Los conceptos que vuelven a aparecer en el ejemplo son:

- MongoDB almacena documentos en colecciones, no filas en tablas.
- Una colección agrupa documentos; un documento es un elemento con campos.
- Express recibe solicitudes por rutas; Mongoose valida el dato antes de guardarlo.
- React representa la interfaz; props llegan desde otro componente y state cambia con una interacción.

### Estación 1: MongoDB, 30 minutos

**Recordatorio:** una base de datos tiene colecciones y cada colección agrupa documentos.

**Detective de datos (10 min):** el documento con errores de clase omite una coma, escribe la edad como texto, combina intereses en una sola cadena y expresa el booleano como texto. Corregido, queda así:

```js
{
  nombre: "Camila Ruiz",
  email: "camila@correo.com",
  edad: 17,
  intereses: ["tortas", "galletas"],
  activo: true
}
```

**Une el comando (5 min):**

| Situación | Operación | Ejemplo |
| --- | --- | --- |
| Registrar un cliente | Crear | `db.usuarios.insertOne({ nombre: "Ana", email: "ana@correo.com" })` |
| Ver usuarios o buscar a Luis | Leer | `db.usuarios.find()` o `db.usuarios.find({ nombre: "Luis" })` |
| Cambiar el correo de Ana | Actualizar | `db.usuarios.updateOne({ nombre: "Ana" }, { $set: { email: "ana2@correo.com" } })` |
| Eliminar a un usuario | Borrar | `db.usuarios.deleteOne({ nombre: "Ana" })` |

**Tu turno (15 min):** cada estudiante redacta un usuario de su emprendimiento o uno del Anexo C. Debe incluir al menos un texto, un número, un booleano y una lista; luego la pareja busca errores en el documento del otro. Al registrar usuarios en la app, los campos se envían al backend y Mongoose persiste el documento.

**Niveles de logro:** mínimo, cuatro campos de tipos distintos sin errores; medio, además escribir el `insertOne`; extendido, insertarlo opcionalmente en Atlas si ya tiene acceso. Atlas no es requisito.

### Pausa activa, 10 minutos

Dos minutos de estiramiento y una búsqueda breve entre puestos: alguien cuyo emprendimiento venda comida, alguien que explique qué es una colección, y alguien que haya guardado su página de React de S20. Esa última conexión ayuda a que un estudiante apoye a otro en la estación siguiente.

### Estación 2: Mongoose y Express, 30 minutos

**Recordatorio:** el esquema de Mongoose es el control de calidad; las rutas de Express son los meseros.

**Esquema de referencia para Dulce Horno:**

```js
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  edad: { type: Number, min: 14 },
  rol: { type: String, enum: ['cliente', 'admin'], default: 'cliente' }
});
```

`required` obliga a enviar el dato; no inventa uno. `default` completa un valor cuando no se envía. `min`/`max` limitan números y `enum` restringe texto a opciones conocidas.

**Las cinco rutas que deben reconocer:**

```js
app.get('/api/usuarios', ...);        // listar todos
app.get('/api/usuarios/:id', ...);    // buscar uno
app.post('/api/usuarios', ...);       // crear
app.put('/api/usuarios/:id', ...);    // actualizar
app.delete('/api/usuarios/:id', ...); // borrar
```

**Adivina el código (12 min):** POST válido → `201`; falta `nombre` → `400`; edad menor que 14 → `400`; rol `jefe` fuera del enum → `400`; edad escrita como texto → `400`; id inexistente → `404`. Recalca: `400` significa que los datos enviados tienen un problema; `404`, que el recurso buscado no existe.

**Actualizaciones:** la ruta busca el documento, aplica los cambios y ejecuta `save()`. Mongoose vuelve a validar el documento completo antes de persistirlo. En rutas construidas con `findByIdAndUpdate`, las reglas se deben pedir con `{ runValidators: true }`.

**El guardia de la puerta (18 min, incluida la práctica):** cada estudiante adapta el esquema con al menos tres reglas y en pareja evalúa tres registros, uno con trampa; luego intercambian roles.

**Niveles de logro:** mínimo, tres campos y al menos un `required`; medio, sumar `min` o `max` y un `default`; extendido, un `enum` de roles reales y mensajes propios.

### Estación 3: React, 40 minutos

**Recordatorio:** componentes son piezas; props son datos que reciben; state es información que cambia con una interacción.

**Vitrina en 20 minutos (25 min en la agenda de estación):** quien conserva S20 adapta esa página; quien no, la reconstruye en StackBlitz con los códigos del Anexo B en el orden A, B, C, D. La página debe mostrar nombre del emprendimiento y tres productos o servicios reales. Cada tarjeta recibe nombre, descripción y precio por props; el botón incrementa su state y usa texto propio del negocio.

La demostración añade el nivel extendido: cuarta tarjeta y botón “Vaciar” que devuelve el contador a cero. Los datos escritos en props serían los mismos campos que podría tener un documento de producto MongoDB, aunque en esta sesión no se conectan.

**Niveles de logro:** mínimo, encabezado y tres tarjetas propias con props; medio, además botón con state y texto propio; extendido, cuarta tarjeta y botón para vaciar.

**Galería (15 min):** ocho minutos para caminar y probar los botones de otras páginas; volver a plenaria con una idea que les gustó. Quien aún no termina continúa con apoyo del mentor.

**Contingencia de StackBlitz:** probar Chrome/Edge, salir de incógnito y recargar; después trabajar en pareja compartiendo teclado y turnos; si la red bloquea el sitio para todo el grupo, el mentor construye la vitrina proyectada con ideas del grupo y se reemplaza la galería por una ronda verbal.

### Bloque 5: el viaje de un pedido, 20 minutos

Cuatro estudiantes representan React, Express, Mongoose y MongoDB. El cliente envía un registro; el mesero lo enruta; el control de calidad acepta o rechaza; la despensa guarda solo si cumple.

| Ronda | Qué pasa | Resultado que debe explicar el grupo |
| --- | --- | --- |
| Valentina con email válido | Pasa el esquema y llega a la colección. | MongoDB guarda; respuesta `201`. |
| Pedido sin nombre | `required` lo detiene en Mongoose. | No llega a MongoDB; respuesta `400`, visible para React. |
| Rol `jefe` | El valor no pertenece al `enum`. | Se detiene en Mongoose; respuesta `400`. |
| GET de id inexistente | Express consulta y MongoDB no encuentra coincidencia. | Respuesta `404` a React. |

Pregunta después de cada ronda: ¿en qué pieza se detuvo el pedido y qué ve el cliente? Cierra identificando qué pieza ya existe en el proyecto final y cuál falta. Si hay pocos estudiantes, rotan los roles hasta que todos hablen.

### Dudas y errores frecuentes

| Duda | Pregunta para guiar, sin dar la respuesta directamente |
| --- | --- |
| Confunde colección con documento. | “Si usuarios es la colección, ¿qué sería Ana?” |
| Escribe números entre comillas. | “¿Podrías comparar quién es mayor de 18 si la edad es texto?” |
| Cree que `required` pone un valor automático. | “¿Qué pasa si no envío rol? ¿Y si no envío nombre?” |
| Confunde `400` y `404`. | “¿El problema es lo que mandaste o lo que buscaste?” |
| Confunde props y state. | “¿Este dato cambia con el clic o siempre llega igual?” |
| React queda en blanco. | Leer en voz alta la primera línea del mensaje de error. |
| El botón no suma. | Revisar `onClick={() => setCantidad(cantidad + 1)}` y el import de `useState`. |
| Perdió la página. | Reconstruirla con Anexo B y guardar el resultado. |

### Cierre, 10 minutos y reto autónomo

Reserva tres minutos para guardar la página (iniciar sesión en StackBlitz o descargar ZIP) y copiar el documento y esquema a un archivo recuperable. Usa los siete minutos restantes para la plenaria:

- En una palabra, ¿cómo te vas de la sesión?
- Completa: “El control de calidad sirve para…”
- ¿Qué pieza del restaurante vas a trabajar primero esta semana?

Antes de terminar, comprueba que cada estudiante pueda decir si ya tiene documento, esquema y página, y que pueda explicar el orden del viaje. Quienes trabajaron con un caso de práctica pueden contar qué parte se parece a su proyecto final.

El reto autónomo es explicar a alguien de casa, con la analogía del restaurante, cómo funcionaría su emprendimiento web. Autoevaluación: ¿puedo escribir un documento con distintos tipos?, elegir el comando CRUD correcto, proponer `required`/`min`/`max`/`enum`/`default`, predecir `201`/`400`/`404`, explicar componente/props/state y narrar el recorrido del dato. Cualquier “todavía no” señala qué repasar.

## Anexos de la clase

### Anexo A: mensaje previo

Enviar 24–48 horas antes: recordar que no hace falta instalar nada; pedir tres productos/servicios con nombre, descripción y precio, el enlace o ZIP de React de S20 si existe, y acceso a GitHub/StackBlitz/Atlas si lo recuerdan. No tener una cuenta no impide participar.

### Anexo B: reconstrucción de React

En `vite.new/react`, crear `src/components/Encabezado.jsx` y `ProductoCard.jsx`, reemplazar `src/App.jsx` y `src/App.css`, en ese orden. Este es el patrón central del material de clase:

```jsx
import { useState } from 'react';

function ProductoCard(props) {
  const [cantidad, setCantidad] = useState(0);
  return (
    <article className="tarjeta">
      <h3>{props.nombre}</h3>
      <p>{props.descripcion}</p>
      <p className="precio">{props.precio}</p>
      <button onClick={() => setCantidad(cantidad + 1)}>
        Agregar al pedido
      </button>
      <p>En tu pedido: {cantidad}</p>
    </article>
  );
}

export default ProductoCard;
```

`App` importa el encabezado y renderiza tres instancias de `ProductoCard` con props distintas. Personaliza datos y textos con el emprendimiento del estudiante; no hace falta añadir backend en esta sesión.

### Anexo C: casos de práctica

Usa el mismo caso en datos, reglas y vitrina. El selector de la app actualiza la vitrina y el documento de muestra; consulta esta tabla para trabajar las reglas específicas de cada caso.

| Caso | Campos del usuario | Reglas sugeridas | Productos de ejemplo |
| --- | --- | --- | --- |
| Ropa de segunda mano | `nombre`, `email`, `ciudad`, `talla`, `compraFrecuente` (booleano) | `nombre` obligatorio; `rol`: comprador o vendedor | Chaqueta de jean $60.000; vestido de flores $45.000; tenis blancos $70.000 |
| Tutorías | `nombre`, `email`, `grado`, `materias` (lista) | `grado` entre 6 y 11; `rol`: estudiante o tutor | Matemáticas $30.000; inglés $35.000; paquete de 4 clases $110.000 |
| Cuidado de mascotas | `nombre`, `email`, `telefono`, `tipoMascota`, `tieneJardin` (booleano) | `tipoMascota`: perro, gato u otro; `rol`: dueño o cuidador | Paseo $15.000; baño $40.000; guardería $50.000 |
| Artesanías | `nombre`, `email`, `municipio`, `intereses` (lista), `verificado` (booleano) | `verificado` tiene `default: false`; `rol`: cliente o artesano | Mochila tejida $120.000; aretes en chaquira $25.000; canasto de fique $55.000 |

Dulce Horno es el ejemplo del mentor y tiene su propio esquema de referencia en la Estación 2.

## Iniciar la aplicación completa

Se necesita MongoDB local ejecutándose en `mongodb://127.0.0.1:27017` o una URI de Atlas configurada en `backend/.env`. Si el Mongo local pide autenticación, configura usuario, contraseña y `authSource` en esa URI. El archivo de ejemplo es `backend/.env.example`.

Abre dos terminales desde la raíz del proyecto:

```powershell
cd backend
npm install
npm start
```

```powershell
cd frontend
npm start
```

La terminal del backend muestra `API lista en http://localhost:5000`. CRA usa esa dirección como proxy; abre la URL que indique la terminal del frontend. En “Usuarios y reglas” las operaciones viajan por Express, el modelo Mongoose las valida y MongoDB guarda los documentos. El campo de estado del encabezado indica si la base está conectada.

Para usar MongoDB Atlas, copia `backend/.env.example` a `backend/.env` y reemplaza `MONGODB_URI` por la URI del clúster. No compartas ni subas ese archivo.