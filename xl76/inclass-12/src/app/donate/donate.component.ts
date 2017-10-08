import { Component, OnInit } from '@angular/core';
import { DonorService } from '../donor/donor.service'

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
  providers:[
  	DonorService
  ]
})
export class DonateComponent implements OnInit {
	Donor;

  constructor(private donorservice: DonorService) { }

  ngOnInit() {
  	this.Donor = this.donorservice.getFeaturedDonor();
  }

}
