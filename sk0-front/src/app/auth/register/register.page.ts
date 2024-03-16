import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";

import { NotificationService } from "../../global-services/notification.service";
import { AppStore } from "../../app.store";
import { navigateToLoginAction, registerStarted } from "../store/auth.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [HttpClientModule]
})
export class RegisterPage {
  private readonly strongPasswordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.strongPasswordValidator)
    ])
  });
  constructor(
    private navCtrl: NavController,
    private notificationService: NotificationService,
    private store: Store<AppStore>
  ) {}

  async onRegister() {
    const email = this.registerForm.get("email")?.value;
    const password = this.registerForm.get("password")?.value;
    const name = this.registerForm.get("name")?.value;

    if (!email || !password || !name) {
      await this.notificationService.alertError(
        "Kérlek tölts ki minden mezőt!"
      );
      return;
    }
    this.store.dispatch(registerStarted({ email, password, name }));
  }

  onRouteToLogin(): void {
    this.store.dispatch(navigateToLoginAction());
  }
}
