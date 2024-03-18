import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Store } from "@ngrx/store";

import { NotificationService } from "../common/services/notification.service";
import { AppStore } from "../app.store";
import { getUserEmail, getUserName } from "../profile/store/profile.selectors";
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
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProfilePage {
  private readonly strongPasswordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  profileForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")
  });

  //TODO: User data display
  name$ = this.store.select(getUserName); // ! FIX get user name
  email$ = this.store.select(getUserEmail); // ! FIX get user email

  constructor(
    private notifyWith: NotificationService,
    private store: Store<AppStore>
  ) {}

  async onUpdate() {
    const updatedUser = this.profileForm.value;
    const isUpdatedPasswordValid =
      updatedUser.password &&
      !this.strongPasswordValidator.test(updatedUser.password);

    if (isUpdatedPasswordValid) {
      return await this.notifyWith.toastMessage(
        "A jelszó nem elég erős",
        "top"
      );
    }

    this.store.dispatch(
      profileUpdateStarted(updatedUser as ProfileUpdateRequest)
    );
  }

  onCancel() {
    this.store.dispatch(navigateBackToHome());
  }
}
