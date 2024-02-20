import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService, LoginResponse } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ProfilePage {
  private readonly strongPasswordValidator =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  userId$ = this.authService.userId;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private navCtl: NavController
  ) {
    this.http
      .get<LoginResponse>(`${environment.baseUrl}/users/${this.userId$.value}`)
      .subscribe({
        next: async (response) => {
          this.profileForm.get('name')?.setValue(response.name),
            this.profileForm.get('email')?.setValue(response.email);
        },
      });
  }

  onChange() {
    const { name, email, password } = this.profileForm.value;

    this.http
      .patch(`${environment.baseUrl}/users/${this.userId$.value}`, {
        name,
        email,
        password,
      })
      .subscribe({
        next: () => {
          //TODO: toast user updated
          console.log('updated');
          this.navCtl.navigateForward('/home');
        },
        error: (err) => {
          //TODO: toast/alert error
          console.log('error: ' + err);
          return;
        },
      });
  }

  onCancel() {
    this.navCtl.navigateBack('/home');
  }
}
