import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NotificationService } from "../common/services/notification.service";
import { Store } from "@ngrx/store";
import { AppStore } from "../app.store";
import { getUser } from "../profile/store/profile.selectors";
import {
  ProfileUpdateRequest,
  profileUpdateStarted
} from "./store/profile.actions";
import { navigateBackToHome } from "../common/store/navigation.actions";

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
    private notifyWith: NotificationService,
    private store: Store<AppStore>
  ) {}

  async onUpdate() {
    const updatedUser = this.profileForm.value;

    if (
      updatedUser.password &&
      !this.strongPasswordValidator.test(updatedUser.password)
    ) {
      await this.notifyWith.toastMessage("A jelszó nem elég erős", "top");
      return;
    }
    this.store.dispatch(
      profileUpdateStarted(updatedUser as ProfileUpdateRequest)
    );
  }

  onCancel() {
    this.store.dispatch(navigateBackToHome());
  }
}
