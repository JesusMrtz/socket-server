import Server from './classes/server';
import router from './router/router';
import cors from 'cors';


const server = Server.instance;

/** Habilitar los CORS desde cualquier ruta diferente al backend */
server.app.use(cors({ origin: true, credentials: true }))

/**
 * Utilizar las rutas
 * Aqui le decimos que inice las rutas desde el archivo raíz
 */
server.app.use('/', router);

/**
 * Corriendo el servidor en el puerto 5000
 */
server.start(() => {
  console.log(`Servidor corriendo en el puerto ${ server.port }`);
});