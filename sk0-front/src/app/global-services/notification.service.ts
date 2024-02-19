import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastController: ToastController) {}

  async showSuccessfulLogin() {
    const toast = await this.toastController.create({
      color: 'primary',
      message: 'Sikeres belépés',
      cssClass: 'successToast',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
  async showSuccessfulRegistration() {
    const toast = await this.toastController.create({
      color: 'primary',
      message: 'Sikeres regisztráció',
      cssClass: 'successToast',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
