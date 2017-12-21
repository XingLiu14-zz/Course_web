import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';

@Injectable()

// for login
export class LoginService {

  accNameLoginControl = new FormControl('', [
    Validators.required
  ]);

  pswdLoginControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private http: Http) {
  }

  getAccNameLoginControl(): FormControl {
    return this.accNameLoginControl;
  }

  getPswdLoginControl(): FormControl {
    return this.pswdLoginControl;
  }

  getValidUser(): Promise<any> {
    return this.http.get('../../assets/users.json').toPromise().then(response => response.json());
  }

  getArticles(): Promise<any> {
    return this.http.get('../../assets/articles.json').toPromise().then(response => response.json());
  }

}
