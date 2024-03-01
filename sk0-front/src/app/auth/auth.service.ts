import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { NavController } from "@ionic/angular";

export interface LoginResponse {
  name: string;
  email: string;
  id: number;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _isUserLoggedIn = new BehaviorSubject<boolean>(false);
  private _userName = new BehaviorSubject<string | null>(null);
  private _userId = new BehaviorSubject<number | null>(null);

  get isUserLoggedIn() {
    return this._isUserLoggedIn;
  }

  get userName() {
    return this._userName;
  }

  get userId() {
    return this._userId;
  }

  private errorMessages = new Map<number, string>([
    [400, "Érvénytelen kérés"],
    [401, "Nem megfelelő email cím vagy jelszó"],
    [403, "Hozzáférés megtagadva"],
    [404, "Az oldal nem található"],
    [409, "Már van felhasználó ezzel az e-mail címmel."],
    [500, "Belső szerverhiba"]
  ]);

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private navCtrl: NavController
  ) {}

  async login(loginFormData: { email: string; password: string }) {
    const { email, password } = loginFormData;
    this.http
      .post<LoginResponse>(`${environment.baseUrl}/users/login`, {
        email,
        password
      })
      .subscribe({
        next: async (user: LoginResponse) => {
          this._userName.next(user.name);
          this._userId.next(user.id);
          this._isUserLoggedIn.next(true);
          this.navCtrl.navigateForward("/home");
        },
        error: (response: HttpErrorResponse) => {
          const errorMessage =
            this.errorMessages.get(response.status) ||
            "Ismeretlen hiba történt";
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

    this.http
      .post(`${environment.baseUrl}/users/register`, {
        name,
        email,
        password
      })
      .subscribe({
        next: async () => {
          this._userName.next(name);
          await this.showSuccess("Sikeres regisztráció");
          this.navCtrl.navigateBack("/login");
        },
        error: (response: HttpErrorResponse) => {
          const errorMessage =
            this.errorMessages.get(response.status) ||
            "Ismeretlen hiba történt";
          this.showError(errorMessage);
        }
      });
  }

  async logout() {
    this._isUserLoggedIn.next(false);
    this._userName.next(null);
  }

  private async showError(errorMessage: string) {
    const alert = await this.alertController.create({
      header: "Hiba",
      message: errorMessage,
      buttons: ["OK"]
    });
    await alert.present();
  }

  private async showSuccess(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ["OK"]
    });
    await alert.present();
  }
}
