import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

//Interface temporary until backend connection
interface Users {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserLoggedIn = false;

  get isUserLoggedIn() {
    return this._isUserLoggedIn;
  }

  mockUsers: Users = {
    'teszt@gmail.com': 'ABCDe111!',
    'firstuser@gmail.com': 'Abcd1234!',
    'seconduser@gmail.com': 'Aaaa111!',
  };

  constructor() {}

  login(email: string, password: string): void {
    // TODO: Connect FE with BE
    if (this.mockUsers[email] !== password) {
      return;
    }
    this._isUserLoggedIn = true;
  }

  register(): void {
    // TODO: Connect FE with BE
  }
}
