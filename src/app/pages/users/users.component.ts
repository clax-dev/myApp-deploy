import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonButton, IonInput } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Users } from '../../services/users';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner, IonButton, IonInput, RouterLink],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;

  nombre = '';
  email = '';
  mensaje = '';

  constructor(private usersService: Users) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.loading = true;
      this.users = await this.usersService.getActiveUsers();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }

  async crearUsuario() {
    if (!this.nombre || !this.email) {
      this.mensaje = 'Rellena nombre y email.';
      return;
    }
    const nuevo = this.usersService.addUser(this.nombre, this.email);
    this.mensaje = `Usuario "${nuevo.name}" creado.`;
    this.nombre = '';
    this.email = '';
    await this.loadUsers();
  }

  eliminar(id: number) {
    this.usersService.deleteUser(id);
    this.users = this.users.filter(u => u.id !== id);
  }
}