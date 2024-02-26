import { Injectable } from "@angular/core";
import { ToastController, AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private toastController: ToastController, private alertController: AlertController) {}

  async toastMessage(message: string, position?: "top" | "middle" | "bottom") {
    const toast = await this.toastController.create({
      color: "primary",
      message,
      duration: 1500,
      position
    });
    await toast.present();
  }

  async alertSuccess(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertError(message: string) {
    const alert = await this.alertController.create({
      header: 'Hiba',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
