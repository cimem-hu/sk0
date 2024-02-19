import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastController: ToastController) {}

  async testMethod() {
    console.log('not service login called');
    const toast = await this.toastController.create({
      color: 'primary',
      message: 'Test message',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
