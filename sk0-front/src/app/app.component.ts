import { Component } from "@angular/core";
import { IonicModule, NavController } from "@ionic/angular";
import { AuthService } from "./auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AppComponent {
  userName$ = this.authService.userName;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  logout() {
    this.authService.logout();
  }

  navigateToUserEdit() {
    this.navCtrl.navigateForward("/profile");
  }
}
