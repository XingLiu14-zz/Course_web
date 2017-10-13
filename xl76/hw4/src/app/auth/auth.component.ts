import {Component, OnInit} from '@angular/core';
import {RegisterService} from './register.service';
import {LoginService} from './login.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [RegisterService, LoginService]
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

  accNameLoginControl;
  pswdLoginControl;

  constructor(private regServ: RegisterService, private loginServ: LoginService) {
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
    const today = new Date();
    const bday = new Date(this.fControl._value.bdayControl);
    let age = today.getFullYear() - bday.getFullYear();
    let month = today.getMonth() - bday.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    return (age >= 18);
  }

}

