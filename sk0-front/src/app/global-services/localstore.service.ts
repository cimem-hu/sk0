import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocalStoreService {
  constructor() {}

  saveToken(token: string | null) {
    //TODO: better handling if token is null?
    if (token !== null) {
      localStorage.setItem("token", token);
    }
  }
  getToken(): string | null {
    //TODO: better handling if token is null?
    return localStorage.getItem("token");
  }
}
