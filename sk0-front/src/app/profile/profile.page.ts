import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { IonicModule, NavController } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { NotificationService } from "../global-services/notification.service";
import { Store } from "@ngrx/store";
import { AppStore } from "../app.store";
import { getUser } from "../auth/store/auth.selectors";
import { navigateBackToHome } from "../auth/store/auth.actions";

const userUpdated = "Az adatok frissítve";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
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

  user$ = this.store.select(getUser);

  constructor(
    private http: HttpClient,
    private navCtl: NavController,
    private notifyWith: NotificationService,
    private store: Store<AppStore>
  ) {}

  async onUpdate() {
    const { name, email, password } = this.profileForm.value;

    if (password && !this.strongPasswordValidator.test(password)) {
      await this.notifyWith.toastMessage("A jelszó nem elég erős", "top");
      return;
    }

    this.http
      .patch(`${environment.baseUrl}/users/${this.userId$.value}`, {
        name,
        email,
        password
      })
      .subscribe({
        next: async () => {
          await this.notifyWith.toastMessage(userUpdated, "top");
          await this.navCtl.navigateForward("/home");
        },
        error: async (err: Error) => {
          await this.notifyWith.toastMessage(err.message, "top");
        }
      });
  }

  onCancel() {
    this.store.dispatch(navigateBackToHome());
  }
}
