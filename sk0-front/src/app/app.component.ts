import { Component, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { getUserName } from "./auth/store/auth.selectors";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  private store = inject(Store);
  userName$ = this.store.select(getUserName);
}
