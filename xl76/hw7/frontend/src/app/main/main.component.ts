import {Component, OnInit} from '@angular/core';
import {NavService} from './nav.service';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [NavService]
})
export class MainComponent implements OnInit {

  articles;
  profile;
  followers;
  users;
  imgPost: string;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'xl76', uploadPreset: 'mm8yjuyi'})
  );

  // get articles, followers, profile from local json file
  constructor(private navServ: NavService) {
    this.articles = JSON.parse(localStorage.getItem('articles') || '');
    // console.log(localStorage.getItem('articles'));
    this.profile = JSON.parse(localStorage.getItem('currUser') || '');
    this.users = JSON.parse(localStorage.getItem('users') || '');
    this.followers = JSON.parse(localStorage.getItem('followers') || '');
    this.articles.filter(arti =>
      arti.author === this.profile.userName)
      .forEach(arti => arti.display = true);
    this.articles.filter(arti =>
      this.followers.indexOf(this.followers.find(user => user.userName === arti.author)) !== -1)
      .forEach(arti => arti.display = true);
    localStorage.setItem('articles', JSON.stringify(this.articles));
  }

  ngOnInit() {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.imgPost = res.url;
      return {item, response, status, headers};
    };
  }

  renderArti(): void {
    this.articles.forEach(arti => arti.display = true);
  }

  searchText(text: string): void {
    this.navServ.searchText(text, this.articles, this.profile, this.followers);
  }

  // add new post
  newPost(Text: string): void {
    this.navServ.newPost(Text, this.articles, this.profile);
  }

  updateHeadline(newHeadline: string): void {
    this.navServ.updateHeadline(newHeadline, this.profile);
  }

  unfollow(name: string): void {
    this.navServ.unfollow(name, this.followers, this.articles);
  }

  newFollower(name: string): void {
    this.navServ.newFollower(name, this.followers, this.articles, this.users, this.profile);
  }

  hideOrDisplayComment(postID: number): void {
    this.navServ.hideOrDisplayComment(postID);
  }

  editComment(postID: number, Text: string): void {
    this.navServ.editComment(postID, Text, this.articles);
  }

  editArticle(postID: number, Text: string): void {
    this.navServ.editArticle(postID, Text, this.articles, this.profile);
  }

  logout(): void {
    localStorage.clear();
  }

  uploadImg() {
    this.uploader.uploadAll();
  }

}
