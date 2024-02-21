import { Component } from "@angular/core";

import { IonicModule, NavController } from "@ionic/angular";
import { AuthService } from "../auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  userName$ = this.authService.userName;
  logoutLabel = "Kijelentkezés";

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  onLogout() {
    this.authService.logout();
    this.navCtrl.navigateBack("/login");
  }
}
