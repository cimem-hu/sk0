import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

type User = {
  name: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserLoggedIn = false;
  private _userName = 'Vendég';

  // TODO: Connect FE with BE and remove mockUsers below
  private mockUsers: User[];

  get isUserLoggedIn() {
    return this._isUserLoggedIn;
  }

  get userName() {
    return this._userName;
  }

  constructor(private alertController: AlertController) {
    // TODO: Connect FE with BE and remove mockUsers below

    this.mockUsers = [
      {
        name: 'First User',
        email: 'teszt@gmail.com',
        password: 'Abcd1234!',
      },
      {
        name: 'Second User',
        email: 'seconduser@gmail.com',
        password: 'Aaaa111!',
      },
    ];
  }

  async login(loginFormData: { email: string; password: string }) {
    const { email, password } = loginFormData;
    // TODO: Connect FE with BE and remove mockUsers and refactor code below
    try {
      const foundUser = this.mockUsers.find((user) => {
        return user.email === email;
      });
      if (!foundUser) {
        throw new Error('Nem megfelelő email cím vagy jelszó');
      }
      if (foundUser.password !== password) {
        throw new Error('Nem megfelelő email cím vagy jelszó');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      return this.showError(errorMessage);
    }
    this._userName = this.mockUsers.find((user) => user.email === email)!.name;
    this._isUserLoggedIn = true;
  }

  async register(registerFormData: {
    name: string;
    email: string;
    password: string;
  }) {
    const { email, password } = registerFormData;
    // TODO: Connect FE with BE and remove mockUsers and refactor code below
    const foundUser = this.mockUsers.find((user) => {
      return user.email === email;
    });
    try {
      if (foundUser !== undefined) {
        throw new Error('A felhasználó már létezik.');
      }
      if (password.length < 6) {
        throw new Error('A jelszó túl gyenge.');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      return this.showError(errorMessage);
    }
    this.mockUsers.push(registerFormData as User);

    this.login({ email, password });
  }

  async logout() {
    this._isUserLoggedIn = false;
    this._userName = '';
  }

  private async showError(errorMessage: string) {
    const alert = await this.alertController.create({
      header: 'Hiba',
      message: errorMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
