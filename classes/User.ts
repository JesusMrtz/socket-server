export class User {
  id: string;
  name: string;
  livingRoom: string;

  constructor(id: string) {
    this.id = id;
    this.name = 'unknown';
    this.livingRoom = 'unknown';
  }
}