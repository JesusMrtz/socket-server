import Server from './classes/server';
import router from './routes/routes';
import cors from 'cors';


const server = new Server();

// Cors
server.app.use(cors({ origin: true, credentials: true }))
// Rutas
server.app.use('/', router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${ server.port }`);
});