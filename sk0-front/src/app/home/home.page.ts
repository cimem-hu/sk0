import { Component, OnInit } from '@angular/core';

import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit {
  userName?: string;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.userName = this.authService.userName;
  }

  ngOnInit() {
    if (!this.authService.isUserLoggedIn) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  onLogout() {
    this.authService.logout();
    this.navCtrl.navigateBack('/login');
  }
}
