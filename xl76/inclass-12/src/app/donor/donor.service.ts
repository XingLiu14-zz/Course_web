import { Injectable } from '@angular/core';

import { Donor } from './donor';
import { DONORS } from './donors';

function findFeaturedDonor(Donor) {
	return Donor.featured == true;
}


@Injectable()
export class DonorService {

	getDonors(): Donor[] {
		return DONORS;
	}

	getFeaturedDonor() : Donor {
		return DONORS.find(donor => donor.featured === true);
	}

	getDonor(id) : Donor {
		return DONORS.find(donor => donor.id === id);
	}

  constructor() {
  	
  }

}
