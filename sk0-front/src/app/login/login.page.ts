import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginService } from './login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private loginService: LoginService,
    private alertController: AlertController
  ) {}

 async loginSubmit() {
    const response = await this.loginService.loginRequest(this.loginForm);

    const alert = await this.alertController.create({
      message: response
        ? 'Sikeres bejelentkezés'
        : 'Nem megfelelő email cím vagy jelszó',
      buttons: [response ? '' : 'OK'],
    });

    await alert.present();

    this.loginForm.reset();
  }
}
