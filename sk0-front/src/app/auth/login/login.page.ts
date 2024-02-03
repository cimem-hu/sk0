import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async onLogin() {
    const email = this.loginForm.get('email')!.value as string;
    const password = this.loginForm.get('password')!.value as string;

    const alert = await this.alertController.create({
      header: 'Hiba!',
      message: 'Nem megfelelő email cím vagy jelszó',
      buttons: ['OK'],
    });

    this.authService.login(email, password);

    if (!this.authService.isUserLoggedIn) {
      await alert.present();
      return;
    }

    this.navCtrl.navigateForward('/home');
  }
}
