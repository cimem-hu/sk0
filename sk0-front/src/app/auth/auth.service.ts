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

  constructor(private http: HttpClient) { }

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

}
