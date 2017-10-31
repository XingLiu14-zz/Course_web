import {Component, OnInit} from '@angular/core';
import {NavService} from '../main/nav.service';
import {FormGroup} from '@angular/forms';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [NavService, ProfileService]
})
export class ProfileComponent implements OnInit {

  profile;
  emlControlUpd;
  phoneControlUpd;
  zipControlUpd;
  updateControl;
  pswdControlUpdate;
  pswdCControlUpdate;

  constructor(private profServ: ProfileService) {
    this.profile = JSON.parse(localStorage.getItem('currUser'));
  }

  ngOnInit() {
    this.emlControlUpd = this.profServ.getEmlControlUpdate();
    this.phoneControlUpd = this.profServ.getPhoneControlUpdate();
    this.zipControlUpd = this.profServ.getZipControlUpdate();
    this.pswdControlUpdate = this.profServ.getPswdControlUpdate();
    this.pswdCControlUpdate = this.profServ.getPswdCControlUpdate();
    this.updateControl = new FormGroup({
      emlControlUpd: this.emlControlUpd,
      phoneControlUpd: this.phoneControlUpd,
      zipControlUpd: this.zipControlUpd,
      pswdControlUpdate: this.pswdControlUpdate,
      pswdCControlUpdate: this.pswdCControlUpdate
    });
  }

  // how to update user profile
  updateProfile(name: string, email: string, phone: string, zip: string): void {
    this.profServ.updateProfile(name, email, phone, zip, this.profile);
  }
}

