import { Service } from '@angular/core';
import { User } from '../models/user';

@Service()
export class Users {
  private apiUsers: User[] | null = null;
  private createdUsers: User[] = [];
  private deletedIds = new Set<number>();
  private nextId = 1000;

  async getUsers(): Promise<User[]> {
    if (!this.apiUsers) {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      this.apiUsers = data.users;
    }
    const all = [...this.apiUsers!, ...this.createdUsers];
    return all.filter(u => !this.deletedIds.has(u.id));
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
    this.createdUsers.push(newUser);
    return newUser;
  }

  deleteUser(id: number) {
    this.deletedIds.add(id);
  }
}