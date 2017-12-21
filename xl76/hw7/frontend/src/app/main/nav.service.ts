import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NavService {

  constructor(private http: Http) {
  }

  // create promise object for each json file

  updateHeadline(newHeadline: string, profile: any): void {
    profile.headline = newHeadline;
    localStorage.setItem('currUser', JSON.stringify(profile));
  }

  unfollow(name: string, followers: any, articles: any): void {
    followers.splice(followers.indexOf(followers.find(people => people.userName === name)), 1);
    localStorage.setItem('followers', JSON.stringify(followers));
    articles.filter(arti =>
      arti.author === name)
      .forEach(arti => arti.display = false);
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  newFollower(name: string, followers: any, articles: any, users: any, profile: any): void {
    const fail = document.getElementById("followFail");
    if (name === profile.userName) {
      fail.innerText = 'You can not follow yourself';
      fail.style.visibility = 'visible';
      return;
    }
    if (followers.indexOf(followers.find(usr => usr.userName === name)) !== -1) {
      fail.innerText = 'You are following this user!';
      fail.style.visibility = 'visible';
      return;
    }
    if (users.indexOf(users.find(usr => usr.userName === name)) === -1) {
      fail.innerText = 'User does not exsit!';
      fail.style.visibility = 'visible';
      return;
    }
    followers.unshift(users.find(usr => usr.userName === name));
    articles.filter(arti =>
      arti.author === name)
      .forEach(arti => arti.display = true);
    localStorage.setItem('followers', JSON.stringify(followers));
    localStorage.setItem('articles', JSON.stringify(articles));
    fail.style.visibility = 'hidden';
    return;
  }

  newPost(Text: string, articles: any, profile: any): void {
    articles.unshift({
      id: -1, text: Text, date: new Date().toString(),
      img: 'http://www.howtoboil.net/wp-content/uploads/2012/05/boil-rice.jpg',
      comments: 'new comment', author: profile.userName, display: true
    });
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  searchText(text: string, articles: any, profile: any, followers: any): void {
    articles.filter(arti =>
      arti.author === profile.userName)
      .forEach(arti => arti.display = true);
    articles.filter(arti =>
      followers.indexOf(followers.find(user => user.userName === arti.author)) !== -1)
      .forEach(arti => arti.display = true);
    if (text !== '') {
      articles.filter(arti => arti.display === true).forEach(function (arti) {
        if (arti.text.indexOf(text) === -1 && arti.author.indexOf(text) === -1) {
          arti.display = false;
        }
      });
    }
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  hideOrDisplayComment(id: number): void {
    const comment = document.getElementById('comment' + id.toString());
    if (comment.style.visibility === 'hidden') {
      comment.style.visibility = 'visible';
    }
    else {
      comment.style.visibility = 'hidden';
    }
  }

  editComment(id: number, text: string, articles: any): void {
    articles.find(arti => arti.id === id).comments = text;
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  editArticle(id: number, text: string, articles: any, profile: any): void {
    if(articles.find(arti => arti.id === id).author === profile.userName) {
      articles.find(arti => arti.id === id).text = text;
    }
    localStorage.setItem('articles', JSON.stringify(articles));
  }
}
