# Aplicación completa · Sesión S21

Frontend React con backend Express, modelo Mongoose y persistencia de usuarios en MongoDB. La guía completa de la clase está en `../material/GUIA.md`.

## Requisitos

- Node.js 20.19 o superior.
- MongoDB local en `mongodb://127.0.0.1:27017`, o una URI de Atlas en `backend/.env`.
- Instalar las dependencias de `backend` y `frontend` con `npm install` en cada carpeta.

## Iniciar

Inicia cada parte desde su propia terminal:

```powershell
cd backend
npm start
```

```powershell
cd frontend
npm start
```

CRA reenvía `/api` al servidor Express en el puerto 5000. La interfaz se abre en el puerto que indique la terminal del frontend.

El servidor usa `mongodb://127.0.0.1:27017/jovenes_creativos` por defecto. Si tu MongoDB local requiere usuario y contraseña, o si usas Atlas, copia `backend/.env.example` como `backend/.env` y configura `MONGODB_URI`. No subas `.env` al repositorio.

## Usar el frontend en StackBlitz

StackBlitz ejecuta React; el backend con Mongoose debe desplegarse externamente porque el driver de MongoDB necesita conexiones TCP. Este repositorio incluye `../render.yaml` para desplegar el backend en Render.

1. Despliega el Blueprint de Render desde tu repositorio.
2. En Render, configura `MONGODB_URI` con tu URI de Atlas y `FRONTEND_ORIGINS` con el origen exacto del preview StackBlitz.
3. Copia `.env.example` a `.env` en `frontend` y configura `REACT_APP_API_URL` con la URL HTTPS de Render.
4. Reinicia `npm start` en StackBlitz.

La conexión a MongoDB ocurre entre Render y Atlas; no desde StackBlitz. Nunca pongas la URI de Atlas en el frontend.

## Scripts del frontend

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
