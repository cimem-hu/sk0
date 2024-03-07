import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { LocalStoreService } from "./localstore.service";

@Injectable({
  providedIn: "root"
})
export class JwtHandlerService {
  constructor(
    private jwtHelper: JwtHelperService,
    private localStore: LocalStoreService
  ) {}

  isExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.localStore.getToken());
  }
  //TODO: create these methods
  getName() {
    const token = this.localStore.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token).name;
    }
  }
  getId() {
    const token = this.localStore.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token).id;
    }
  }
  getRole() {}
}
