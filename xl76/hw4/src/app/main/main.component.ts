import { Component, OnInit } from '@angular/core';
import { NavService } from './nav.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [NavService]
})
export class MainComponent implements OnInit {

  // get articles, followers, profile from local json file
  articles;
  followers;
  profile;
  constructor(private navServ: NavService) {
    this.articles = [];
    this.navServ.getPost().then(posts => {
      this.articles = posts;
    });
    this.followers = [];
    this.navServ.getFollower().then(followers => {
      this.followers = followers;
    });
    this.profile = {};
    this.navServ.getUserProfile().then(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
  }

  // when the text doesn't shown on the post, make it disappear
  searchText(text: string): void {
    this.articles.forEach(arti => arti.display = true);
    if (text != null) {
      this.articles.forEach(function(arti) {
        if (arti.text.indexOf(text) === -1 && arti.author.indexOf(text) === -1) {
          arti.display = false;
        }
      });
    }
    if (text === '') {
      this.articles.forEach(arti => arti.display = true);
    }
  }

  // add new post
  newPost(Text: string): void {
    this.articles.unshift({_id: 1, text: Text, date: new Date().toString(),
      img: 'http://www.howtoboil.net/wp-content/uploads/2012/05/boil-rice.jpg',
      comments: 'new comment', author: this.profile.name, display: true});
  }

  updateHeadline(newHeadline: string): void {
    this.profile.headline = newHeadline;
  }

  unfollow(name: string): void {
    this.followers.find(people => people.name === name).display = false;
  }

  newFollower(name: string): void {
    this.followers.push({name: name, headline: 'Yo, sup',
      avatar: 'https://www.organicfacts.net/wp-content/uploads/brownrice2.jpg', display: true})
  }
}
