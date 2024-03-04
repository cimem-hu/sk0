import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { AuthService, LoginResponse } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { NotificationService } from "../global-services/notification.service";

const userUpdated = "Az adatok frissítve";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ProfilePage {
  private readonly strongPasswordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  profileForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")
  });

  userId$ = this.authService.userId;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private navCtl: NavController,
    private notifyWith: NotificationService
  ) {
    this.http
      .get<LoginResponse>(`${environment.baseUrl}/users/${this.userId$.value}`)
      .subscribe({
        next: async (response) => {
          this.profileForm.get("name")?.setValue(response.name);
          this.profileForm.get("email")?.setValue(response.email);
        }
      });
  }

  onUpdate() {
    const { name, email, password } = this.profileForm.value;

    this.http
      .patch(`${environment.baseUrl}/users/${this.userId$.value}`, {
        name,
        email,
        password
      })
      .subscribe({
        next: () => {
          this.notifyWith.toastMessage(userUpdated, "top");
          this.navCtl.navigateForward("/home");
        },
        error: (err: Error) => {
          this.notifyWith.toastMessage(err.message, "top");
          return;
        }
      });
  }

  onCancel() {
    this.navCtl.navigateBack("/home");
  }
}
