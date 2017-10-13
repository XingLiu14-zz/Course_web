import { Injectable } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Injectable()

// for login
export class LoginService {

  accNameLoginControl= new FormControl('', [
    Validators.required
  ]);

  pswdLoginControl= new FormControl('', [
    Validators.required
  ]);

  constructor() { }

  getAccNameLoginControl(): FormControl {
    return this.accNameLoginControl;
  }

  getPswdLoginControl(): FormControl {
    return this.pswdLoginControl;
  }

}
