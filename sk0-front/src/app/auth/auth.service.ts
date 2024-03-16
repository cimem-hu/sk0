import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequest, LoginResponse } from "./store/auth.actions";
import { environment } from "../../environments/environment";

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
}