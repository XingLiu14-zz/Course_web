import { Injectable } from '@angular/core';

@Injectable()
export class ListingService {
	app = {
		name: "",
		description: ""
	}
 	donate = {
		name: "",
		description: ""
	}
 	about = {
		name: "",
		description: ""
	}
 	contact = {
		name: "",
		description: ""
	}
 	home = {
		name: "",
		description: ""
	}
 	list = {
		name: "",
		description: ""
	}

  	constructor() { 
  		this.app.name = "APP";
  		this.app.description = "this ia a app";
  		this.donate.name = "DONATE";
  		this.donate.description = "donation";
  		this.about.name = "ABOUT";
  		this.about.description = "Harvey";
  		this.contact.name = "CONTACT";
  		this.contact.description = "123-123-1231";
  		this.home.name = "HOME";
  		this.home.description = "this is home Page";
  		this.list.name = "LIST";
  		this.list.description = "list all items";
  	}

}