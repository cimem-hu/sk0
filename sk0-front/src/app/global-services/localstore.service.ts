import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStoreService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken(): string | null {
    return localStorage.getItem("token");
  }
  removeToken() {
    localStorage.removeItem("token");
  }
}