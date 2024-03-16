import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from "./store/auth.actions";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private errorMessages = new Map<number, string>([
    [400, "Érvénytelen kérés"],
    [401, "Nem megfelelő email cím vagy jelszó"],
    [403, "Hozzáférés megtagadva"],
    [404, "Az oldal nem található"],
    [409, "Már van felhasználó ezzel az e-mail címmel."],
    [500, "Belső szerverhiba"]
  ]);

  constructor(private http: HttpClient) {}

  login(loginDto: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.baseUrl}/users/login`,
      loginDto
    );
  }

  register(registerDto: RegisterRequest) {
    return this.http.post<RegisterResponse>(
      `${environment.baseUrl}/users/register`,
      registerDto
    );
  }

  // async register(registerFormData: {
  //   name: string;
  //   email: string;
  //   password: string;
  // }) {
  //   const { name, email, password } = registerFormData;

  //   this.http
  //     .post(`${environment.baseUrl}/users/register`, {
  //       name,
  //       email,
  //       password
  //     })
  //     .subscribe({
  //       next: () => {
  //         this._userName.next(name);
  //         this.notificationService.alertSuccess("Sikeres regisztráció");
  //         this.navCtrl.navigateBack("/login");
  //       },
  //       error: (response: HttpErrorResponse) => {
  //         const errorMessage =
  //           this.errorMessages.get(response.status) ??
  //           "Ismeretlen hiba történt";
  //         this.notificationService.alertError(errorMessage);
  //       }
  //     });
  // }

  // async logout() {
  //   this._isUserLoggedIn.next(false);
  //   this._userName.next(null);
  //   this._userId.next(null);
  //   this.navCtrl.navigateBack("/login");
  // }
}
