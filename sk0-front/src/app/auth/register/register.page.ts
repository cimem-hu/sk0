import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RegisterPage {
  private readonly strongPasswordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.strongPasswordValidator),
    ]),
  });
  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  async onRegister() {
    const email = this.registerForm.get('email')!.value as string;
    const password = this.registerForm.get('password')!.value as string;
    const name = this.registerForm.get('name')!.value as string;

    this.authService.register({ email, password, name });

    if (!this.authService.isUserLoggedIn) {
      // TODO: manage error alerts
      return;
    }

    this.navCtrl.navigateForward('/home');
  }

  private async errorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Hiba!',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  onRouteToLogin(): void {
    this.navCtrl.navigateBack('/login');
  }
}
