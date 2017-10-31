import { Injectable } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Injectable()
export class ProfileService {

  // create form control
  emlControlUpdate= new FormControl('', [
    Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')
  ]);

  phoneControlUpdate= new FormControl('', [
    Validators.pattern('\\d\\d\\d-\\d\\d\\d-\\d\\d\\d\\d')
  ]);

  zipControlUpdate= new FormControl('', [
    Validators.pattern('\\d\\d\\d\\d\\d')
  ]);

  pswdControlUpdate= new FormControl('', [
    Validators.pattern('\\S+-\\S+-\\S+')
  ]);

  pswdCControlUpdate= new FormControl('', []);

  constructor() { }

  getEmlControlUpdate(): FormControl {
    return this.emlControlUpdate;
  }

  getPhoneControlUpdate(): FormControl {
    return this.phoneControlUpdate;
  }

  getZipControlUpdate(): FormControl {
    return this.zipControlUpdate;
  }

  getPswdControlUpdate(): FormControl {
    return this.pswdControlUpdate;
  }

  getPswdCControlUpdate(): FormControl {
    return this.pswdCControlUpdate;
  }

  updateProfile(name: string, email: string, phone: string, zip: string, profile: any): void {
    if (name !== '') {
      profile.displayName = name;
    }
    if (email !== '') {
      profile.email = email;
    }
    if (phone !== '') {
      profile.phone = phone;
    }
    if (zip !== '') {
      profile.zipcode = zip;
    }
    localStorage.setItem('currUser', JSON.stringify(profile));
  }
}
