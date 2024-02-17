import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '@capacitor/app';
import { getUserName } from '../auth/store/auth.selectors';
import { logoutAction } from '../auth/store/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  private readonly store: Store = inject(Store<AppState>);

  userName$ = this.store.select(getUserName);
  logoutLabel = 'Kijelentkezés';

  onLogout() {
    this.store.dispatch(logoutAction());
  }
}
