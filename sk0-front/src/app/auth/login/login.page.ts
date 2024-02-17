import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ViewDidLeave } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginStarted } from '../store/auth.actions';
import { AppStore } from 'src/app/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage implements ViewDidLeave {
  private readonly store: Store = inject(Store<AppStore>);
  loginForm = new FormGroup({
    email: new FormControl<string>("", [Validators.email]),
    password: new FormControl<string>("", [Validators.minLength(6)]),
  });

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (!email || !password) {
        //TODO: add alert or make form invalid/dirty or add error
        return;
      }
      this.store.dispatch(loginStarted({ email, password }));
    }
  }

  ionViewDidLeave() {
    this.loginForm.reset();
  }
}
