import { Socket } from 'socket.io';
import socketIO from 'socket.io';


export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
}

/**
 * Escuchar los mensajes
 */
export const messages = (client: Socket, io: socketIO.Server) => {
  client.on('send-message', (payload: { from: string, message: string }, callback: Function) => {
    console.log('Mensaje recibido', payload);

    /**
     * Enviar mensajes a todos los usuarios con IO
     */
    io.emit('new-message', payload)
  })
}