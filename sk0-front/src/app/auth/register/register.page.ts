import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  private readonly emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  constructor(private alertController: AlertController) {}

  async onRegister() {
    if (!this.name || !this.email || !this.password) {
      return this.errorAlert('Minden mező kitöltése kötelező.');
    }

    if (!this.emailValid.test(this.email)) {
      return this.errorAlert('Érvénytelen email cím.');
    }

    if (!this.passwordValid.test(this.password)) {
      return this.errorAlert('A jelszó nem elég erős. Legalább 6 karakter hosszú legyen, tartalmazzon kis- és nagybetűket és számjegyeket is.');
    }

    // Ellenőrizze, hogy az email már regisztrált-e az adatbázisban

    // Hozza létre az adatbázisban a felhasználót

    // Sikeres regisztráció esetén bejelentkezés
    this.login();
  }

  private async errorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Hiba',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  login() {
    // Átirányít a felhasználó fiókjába
  }
}