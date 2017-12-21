import {Component, OnInit} from '@angular/core';
import {NavService} from '../main/nav.service';
import {FormGroup} from '@angular/forms';
import {ProfileService} from './profile.service';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import { User } from '../model/user';
import {DataService} from '../data/data.service';

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
  model: User;
  current: User;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'xl76', uploadPreset: 'mm8yjuyi'})
  );

  uploadAvatar() {
    this.uploader.uploadAll();
  }

  constructor(private profServ: ProfileService, private dataServ: DataService) {
    this.profile = JSON.parse(localStorage.getItem('currUser'));
  }

  ngOnInit() {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.current.img = res.url;
      this.model.img = res.url;
      console.log(this.current.img);
      this.dataServ.editAvatar(this.model.img);
      console.log('12345');
      return {item, response, status, headers};
    };
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

