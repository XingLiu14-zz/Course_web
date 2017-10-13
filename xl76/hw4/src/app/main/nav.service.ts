import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NavService {

  constructor(private http: Http) { }

  // create promise object for each json file
  getPost(): Promise<any> {
    return this.http.get('../../assets/articles.json').toPromise().then(response => response.json())
      .then(res => res.articles);
  }

  getFollower(): Promise<any> {
    return this.http.get('../../assets/followers.json').toPromise().then(response => response.json())
      .then(res => res.followers);
  }

  getUserProfile(): Promise<any> {
    return this.http.get('../../assets/profile.json').toPromise().then(response => response.json())
  }

}
