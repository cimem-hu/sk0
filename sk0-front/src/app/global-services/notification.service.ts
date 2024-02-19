import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastController: ToastController) {}

  async showSuccessfulLogin() {
    const toast = await this.toastController.create({
      message: 'Sikeres belépés',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }
  async showSuccessfulRegistration() {
    const toast = await this.toastController.create({
      message: 'Sikeres regisztráció',
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }
}
