import { Injectable } from '@angular/core';

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

  login(loginFormData: { email: string; password: string }): void {
    // TODO: Connect FE with BE
    const { email, password } = loginFormData;
    if (this.mockUsers[email] !== password) {
      return;
    }
    this._isUserLoggedIn = true;
  }

  register(registerUserData: {
    name: string;
    email: string;
    password: string;
  }): void {
    // TODO: Connect FE with BE
    const { name, email, password } = registerUserData;
    this.mockUsers[email] = password;
    console.log(this.mockUsers);

    this.login({ email, password });
  }
}
