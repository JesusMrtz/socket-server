import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import { SERVER_PORT } from '../global/environment';
import * as socket from '../sockets/sockets';


export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public io: socketIO.Server;
  public port: number;

  private httpServer: http.Server;

  private constructor() {
    this.app =  express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = new socketIO.Server(this.httpServer, {
      cors: { origin: true, credentials: true }
    });
    
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.listeningSockets();
  }

  start(callback: any) {
    this.httpServer.listen(this.port, callback);
  }

  public static get instance() {
    return this._instance || ( this._instance = new this() )
  }

  private listeningSockets() {
    console.log('Escuchando sockets');
    
    this.io.on('connection', (client) => {
      console.log('Cliente conectado');

      /**
       * Escuchar los mensajes enviados por el cliente
       */
      socket.messages(client, this.io);
      /**
       * Desconectar socket
       */
      socket.disconnect(client);
    });
  }

}