import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { AuthService } from "../auth.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
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
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async onLogin() {
    const email = this.loginForm.get("email")!.value as string;
    const password = this.loginForm.get("password")!.value as string;

    await this.authService.login({ email, password });
  }

  ionViewDidLeave() {
    this.loginForm.reset();
  }
}
