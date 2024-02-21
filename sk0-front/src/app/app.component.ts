import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AuthService } from "./auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AppComponent {
  userName$ = this.authService.userName;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
