import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { StorageService } from "./storage.service";
import { User } from "../../../app/profile/store/profile.reducer";

@Injectable({
  providedIn: "root"
})
export class JwtHandlerService {
  constructor(
    private jwtHelper: JwtHelperService,
    private store: StorageService
  ) {}

  async getUser(): Promise<User | null> {
    const token = await this.store.tokenGetter();
    if (token) {
      return (await this.jwtHelper.decodeToken(token)) as User;
    }
    return null;
  }

  async isExpired(): Promise<boolean> {
    return await this.jwtHelper.isTokenExpired(this.store.tokenGetter());
  }
}
