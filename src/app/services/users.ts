import { Service } from '@angular/core';
import { User } from '../models/user';

@Service()
export class Users {
  private users: User[] = [
    { id: 1, name: 'Ana', email: 'ana@test.com', active: true },
    { id: 2, name: 'Luis', email: 'luis@test.com', active: false },
    { id: 3, name: 'Carlos', email: 'carlos@test.com', active: true }
  ];
  private deletedIds = new Set<number>();
  private nextId = 1000;

  async getUsers(): Promise<User[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const activos = this.users.filter(u => !this.deletedIds.has(u.id));
        resolve(activos);
      }, 500);
    });
  }

  async getActiveUsers(): Promise<User[]> {
    const users = await this.getUsers();
    return users.filter(u => u.active);
  }

  async getUserById(id: number): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find(u => u.id === id);
  }

  addUser(name: string, email: string): User {
    const newUser: User = {
      id: this.nextId++,
      name,
      email,
      active: true,
    };
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(id: number) {
    this.deletedIds.add(id);
  }
}