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

  pswdControlUpdate= new FormControl('', []);

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
}
