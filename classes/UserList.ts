import { User } from "./User";

export class UserList {
  private list: User[] = [];

  constructor() {}

  /** Agregar un usuario */
  public add(user: User) {
    this.list.push(user);
    console.log(this.list);
    return user;
  }

  public updateName(id: string, name: string) {
    const index = this.list.findIndex(user => user.id === id);
    if (index === -1) return;
    this.list[index].name = name;
    
    console.log('Actualizando usuario');
    console.log(this.list);
  }

  /** Obtener lista de usuarios */
  getList() {
    return this.list;
  }

  /**  Obtener un usuario */
  getUser(id: string) {
    return this.list.find(user => user.id === id);
  }

  getUsersInLivingRoom(livingRoom: string) {
    return this.list.filter(user => user.livingRoom === livingRoom);
  }

  /** Eliminar el usuario */
  deleteUser(id: string) {
    const temporalUser = this.getUser(id);
    this.list = this.list.filter(user => user.id !== id);
    
    return temporalUser;
  }
}