import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController, ViewDidLeave } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { registerStarted } from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [HttpClientModule]
})
export class RegisterPage implements ViewDidLeave {

  private readonly navCtrl: NavController = inject(NavController);
  private readonly store: Store = inject(Store);

  private readonly strongPasswordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.pattern(this.strongPasswordValidator)),
  });

  async onRegister() {
    if (this.registerForm.valid) {
      const { email, name, password } = this.registerForm.value;
      if (!email || !password || !name) {
        //TODO: use error in the form or create alert/tost to inform the user
        return;
      }
      this.store.dispatch(registerStarted({ email, password, name }))
    }
  }

  ionViewDidLeave() {
    this.registerForm.reset();
  }

  onRouteToLogin(): void {
    this.navCtrl.navigateBack('/login');
  }
}
