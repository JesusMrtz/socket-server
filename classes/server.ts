import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import { SERVER_PORT } from '../enviroment/environment';
import * as socket from '../sockets/sockets';


export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;
  public io: socketIO.Server;

  private httpServer: http.Server;

  private constructor() {
    this.app =  express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);

    /** 
     * Configuración de los sockets con el servidor de expresee con la ayuda del httpServer ya que no son compatibles entre si
     * Http y express si son totalmente compatibles
     * Configurar los CORS  */
    this.io = new socketIO.Server(this.httpServer, {
      cors: { origin: true, credentials: true }
    });
    
    /** Configurar el bodyParser para leer el body de las peticiones post y serializarla en un objeto javaScript */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.listeningSockets();
  }

  public static get instance() {
    return this._instance || ( this._instance = new this() )
  }

  /**
   * @param callback 
   * Levantar el proyecto en el puerto 5000
   */
  start(callback: any) {
    this.httpServer.listen(this.port, callback);
  }

  private listeningSockets() {
    console.log('Escuchando sockets');
    
    this.io.on('connection', (client) => {
      /** Configurar usuario */
      socket.connectClient(client);
      socket.configureUser(client, this.io);

      /** Escuchar los mensajes enviados por el cliente */
      socket.messages(client, this.io);

      /** Desconectar socket */
      socket.disconnect(client);
    });
  }

}