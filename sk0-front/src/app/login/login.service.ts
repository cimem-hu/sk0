import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
interface Users {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: Users = {
    'teszt@gmail.com': 'ABCDe111!',
    'firstuser@gmail.com': 'Abcd1234!',
    'seconduser@gmail.com': 'Aaaa111!',
  };

  constructor() {}
  loginrequest(formData: FormGroup): boolean {
    const email: string = formData.get('email')?.value;
    const password: string = formData.get('password')?.value;
    return this.users[email] === password;
    // TODO: find a way to import HTTPClient and mock HTTP response
  }
}
