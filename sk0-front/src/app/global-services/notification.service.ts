import { Injectable } from "@angular/core";
import { ToastController, AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private toastController: ToastController) {}

  async toastMessage(message: string, position?: "top" | "middle" | "bottom") {
    const toast = await this.toastController.create({
      color: "primary",
      message,
      duration: 1500,
      position
    });
    await toast.present();
  }
}
