import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  params = {
    name: ''
  }
  data = { firstName: '', lastName: '' };

  message: string;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private storage: Storage,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.storage.get('userId').then(userId => {
      this.userService.userById({ id: userId }).subscribe((res: any) => {
        const { firstName, lastName } = res;
        this.data['firstName'] = firstName;
        this.data['lastName'] = lastName;
      });
    });
  }

  loadSpecialInfo() {
    this.authService.getSpecialData().subscribe(res => {
      this.data = res['msg'];
    });
  }

  logout() {
    this.authService.logout();
  }

  clearToken() {
    this.storage.remove('access_token');

    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }
}