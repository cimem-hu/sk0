import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";

import { NotificationService } from "../../global-services/notification.service";
import { AppStore } from "../../app.store";
import { loginStarted } from "../store/auth.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl("", []),
    password: new FormControl("", [])
  });

  constructor(
    private notificationService: NotificationService,
    private store: Store<AppStore>
  ) {}

  async onLogin() {
    const email = this.loginForm.get("email")!.value as string;
    const password = this.loginForm.get("password")!.value as string;

    if (!email || !password) {
      await this.notificationService.alertError(
        "Kérlek tölts ki minden mezőt!"
      );
      return;
    }

    this.store.dispatch(loginStarted({ email, password }));
  }

  ionViewDidLeave() {
    this.loginForm.reset();
  }
}
