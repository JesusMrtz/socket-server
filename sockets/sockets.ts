import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/UserList';
import { User } from '../classes/User';


export const usersOnline = new UserList();

export const connectClient = (client: Socket) => {
  const user = new User(client.id);
  usersOnline.add(user);
}

export const disconnect = (client: Socket) => {
  client.on('disconnect', () => {
    usersOnline.deleteUser(client.id);
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

/** Método para confiurar un usuario  */
export const configureUser = (client: Socket, io: socketIO.Server) => {
  client.on('configure-user', (payload: { name: string }, callBack: Function) => {
    usersOnline.updateName(client.id, payload.name);
    callBack({
      ok: true,
      message: `${payload.name} configurado correctamente`
    });
  });
}