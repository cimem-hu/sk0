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

  constructor(public alertController: AlertController) {}

  async register() {
    if (!this.name || !this.email || !this.password) {
      this.errorAlert('Minden mező kitöltése kötelező.');
      return;
    }

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValid.test(this.email)) {
      this.errorAlert('Érvénytelen email cím.');
      return;
    }

    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordValid.test(this.password)) {
      this.errorAlert('A jelszó nem elég erős. Legalább 6 karakter hosszú legyen, tartalmazzon kis- és nagybetűket és számjegyeket is.');
      return;
    }

    // Ellenőrizze, hogy az email már regisztrált-e az adatbázisban

    // Hozza létre az adatbázisban a felhasználót

    // Sikeres regisztráció esetén bejelentkezés
    this.login();
  }

  async errorAlert(message: string) {
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