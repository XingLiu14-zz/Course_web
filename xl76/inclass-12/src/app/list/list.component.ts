import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListingService],
  template:`
  <p>{{this.list.app.name}}:{{this.list.app.description}}</p>
  <p>{{this.list.donate.name}}:{{this.list.donate.description}}</p>
  <p>{{this.list.about.name}}:{{this.list.about.description}}</p>
  <p>{{this.list.contact.name}}:{{this.list.contact.description}}</p>
  <p>{{this.list.home.name}}:{{this.list.home.description}}</p>
  <p>{{this.list.list.name}}:{{this.list.list.description}}</p>
  `
})
export class ListComponent implements OnInit {

  constructor(private list: ListingService) { }

  ngOnInit() {
  }

}
