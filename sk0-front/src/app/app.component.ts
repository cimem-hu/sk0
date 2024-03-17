import { Component } from "@angular/core";
import { IonicModule, NavController } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";

import { AppStore } from "./app.store";
import { logoutAction } from "./auth/store/auth.actions";
import { getUserName } from "./profile/store/profile.selectors";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AppComponent {
  userName$ = this.store.select(getUserName);

  constructor(
    private store: Store<AppStore>,
    private navCtrl: NavController
  ) {}

  logout() {
    this.store.dispatch(logoutAction());
  }

  navigateToUserEdit() {
    this.navCtrl.navigateForward("/profile");
  }
}
