import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';

interface LoginResponse {
  name: string;
  email: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserLoggedIn = new BehaviorSubject<boolean> (false);
  private _userName = 'Vendég';

  get isUserLoggedIn() {
    return this._isUserLoggedIn;
  }

  get userName() {
    return this._userName;
  }

  constructor(private alertController: AlertController, private http: HttpClient, private navCtrl: NavController) {}

  async login(loginFormData: { email: string; password: string }) {
    const { email, password } = loginFormData;
  
    this.http.post<LoginResponse>(`${environment.baseUrl}/users/login`, { email, password }).subscribe({
      next: async (user: LoginResponse) => {
        this._userName = user.name;
        this._isUserLoggedIn.next(true);
        await this.showSuccess('Sikeres bejelentkezés');
        this.navCtrl.navigateForward('/home');
      },
      error: (response: HttpErrorResponse) => {
        let errorMessage: string;
  
        switch (response.status) {
          case 400:
            errorMessage = 'Érvénytelen kérés';
            break;
          case 401:
            errorMessage = 'Nem megfelelő email cím vagy jelszó';
            break;
          case 403:
            errorMessage = 'Hozzáférés megtagadva';
            break;
          case 404:
            errorMessage = 'Az oldal nem található';
            break;
          case 500:
            errorMessage = 'Belső szerverhiba';
            break;
          default:
            errorMessage = 'Ismeretlen hiba történt';
            break;
        }
  
        this.showError(errorMessage);
      }
    });
  }

  async register(registerFormData: {
    name: string;
    email: string;
    password: string;
  }) {
    const { name, email, password } = registerFormData;
  
    this.http.post(`${environment.baseUrl}/users/register`, { name, email, password }).subscribe({
      next: async () => {
        this._userName = name;
        await this.showSuccess('Sikeres regisztráció');
        this.navCtrl.navigateForward('/login');
      },
      error: (response: HttpErrorResponse) => {
        let errorMessage: string;
  
        switch (response.status) {
          case 400:
            errorMessage = 'Érvénytelen kérés';
            break;
          case 401:
            errorMessage = 'Nem megfelelő email cím vagy jelszó';
            break;
          case 403:
            errorMessage = 'Hozzáférés megtagadva';
            break;
          case 404:
            errorMessage = 'Az oldal nem található';
            break;
          case 409:
            errorMessage = 'Már van felhasználó ezzel az e-mail címmel.';
            break;
          case 500:
            errorMessage = 'Belső szerverhiba';
            break;
          default:
            errorMessage = 'Ismeretlen hiba történt';
            break;
        }
  
        this.showError(errorMessage);
      }
    });
  }
  
  

  async logout() {
    this._isUserLoggedIn.next(false);
    this._userName = '';
  }

  private async showError(errorMessage: string) {
    const alert = await this.alertController.create({
      header: 'Hiba',
      message: errorMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private async showSuccess(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
