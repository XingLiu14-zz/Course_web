import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';
import {LoginService} from './login.service';
import {FormGroup} from '@angular/forms';
import {Data, Router} from '@angular/router';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [RegisterService, LoginService, DataService]
})
export class AuthComponent implements OnInit {

  // control for each input
  accNameControl;
  emlControl;
  phoneControl;
  bdayControl;
  zipControl;
  pswdControl;
  pswdCControl;
  fControl;
  validUser;
  articles;
  followers;

  accNameLoginControl;
  pswdLoginControl;

  constructor(private regServ: RegisterService, private loginServ: LoginService, private router: Router,
              private dataServ: DataService) {
    this.loginServ.getValidUser().then(res => res.users).then(users => {
      this.validUser = users;
    });
    this.loginServ.getArticles().then(res => res.articles).then(articles => {
      this.articles = articles;
    });
  }

  ngOnInit() {
    // import control from service
    this.accNameControl = this.regServ.getAccNameControl();
    this.emlControl = this.regServ.getEmlControl();
    this.phoneControl = this.regServ.getPhoneControl();
    this.bdayControl = this.regServ.getBdayControl();
    this.zipControl = this.regServ.getZipControl();
    this.pswdControl = this.regServ.getPswdControl();
    this.pswdCControl = this.regServ.getPswdCControl();
    this.fControl = new FormGroup({
      accNameControl: this.accNameControl,
      emlControl: this.emlControl,
      phoneControl: this.phoneControl,
      bdayControl: this.bdayControl,
      zipControl: this.zipControl,
      pswdControl: this.pswdControl,
      pswdCControl: this.pswdCControl
    });

    this.accNameLoginControl = this.loginServ.getAccNameLoginControl();
    this.pswdLoginControl = this.loginServ.getPswdLoginControl();
  }

  // check tf the user is older than 18
  checkBday() {
    return this.regServ.checkBday(this.fControl);
  }

  checkValidUser(inputUser, inputPswd) {
    if (this.validUser.find(usr => usr.userName === inputUser) !== undefined) {
      if (this.validUser.find(usr => usr.userName === inputUser).pswd === inputPswd) {
        this.router.navigate(['/main']);
        localStorage.setItem('users', JSON.stringify(this.validUser));
        localStorage.setItem('currUser', JSON.stringify(this.validUser.find(usr => usr.userName === inputUser)));
        localStorage.setItem('articles', JSON.stringify(this.articles));
        this.followers = this.validUser.filter(user =>
          this.validUser.find(usr => usr.userName === inputUser).following.indexOf(user.id) !== -1);
        localStorage.setItem('followers', JSON.stringify(this.followers));
      }
    }
    document.getElementById('invalidUser').style.visibility = 'visible';
  }

  newUserRegister(): void {
    document.getElementById('regSuccess').style.visibility = 'visible';

  }
}
