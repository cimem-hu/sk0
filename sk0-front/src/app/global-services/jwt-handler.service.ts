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

  private getToken(): string | null {
    return this.localStore.getToken();
  }

  private getField(field: string): string | undefined {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token)[field];
    }
    return undefined;
  }

  isExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.getToken());
  }

  getName(): string | undefined {
    return this.getField("name");
  }

  getId() {
    return this.getField("id");
  }
}
