import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/angular';
import { Users } from '../../services/users';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSpinner],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;

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
}