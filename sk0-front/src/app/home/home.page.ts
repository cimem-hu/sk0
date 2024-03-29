import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Store } from "@ngrx/store";

import { AppStore } from "../app.store";
import { logoutAction } from "../auth/store/auth.actions";
import { getUserName } from "../profile/store/profile.selectors";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  userName$ = this.store.select(getUserName);
  logoutLabel = "Kijelentkezés";

  constructor(private store: Store<AppStore>) {}

  onLogout() {
    this.store.dispatch(logoutAction());
  }
}
