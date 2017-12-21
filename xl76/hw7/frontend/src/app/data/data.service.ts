import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {RequestOptions} from '@angular/http';
import {RequestMethod} from '@angular/http';
import {Article} from '../model/article';
import 'rxjs/add/operator/toPromise';


const url = (path) => `https://xl76-ricebook.herokuapp.com${path}`;

@Injectable()
export class DataService {
  private handleError(error: any): Promise<any> {
    console.error('An HTTP error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {
  }

  registerUser(userName: string, phone: string, zipcode: string, email: string, password: string,
               dateOfBirth: Date, avatar: string, displayName?: string): void {
    const body = JSON.stringify({
      usertName: userName,
      phone: phone,
      displayName: displayName,
      zipcode: zipcode,
      bday: dateOfBirth,
      email: email,
      password: password,
      avatar: avatar
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers,
      withCredentials: true,
      body: body
    });
    this.http.request(url('/register'), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  login(username: string, password: string): Promise<boolean> {
    const body = JSON.stringify({username: username, password: password}); // Stringify payload
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers,
      withCredentials: true,
      body: body
    });
    return this.http.request(url('/login'), options)
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res;
      })
      .then(res => res.json().result === 'Success')
      .catch(this.handleError);
  }

  getArticles(author: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url('/articles/' + author), options)
      .toPromise()
      .then(res => res.json())
      .then(res => res.articles as Article[])
      .catch(this.handleError);
  }

  // get current user's followers
  getFollowers() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url('/following'), options)
      .toPromise()
      .then(response => response.json().following as string[])
      .catch(this.handleError);
  }

  deleteFollower(username: string) {
    const body = JSON.stringify({});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Delete,
      headers: headers,
      withCredentials: true,
      body: body
    });

    return this.http.request(url('/following/' + username), options)
      .toPromise()
      .then(res => res.json().following as string[])
      .then(res => console.log(res))  //  followers after deleting
      .catch(this.handleError);
  }

  addFollower(username: string): Promise<string> {
    const body = JSON.stringify({});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    });
    return this.http.request(url('/following/' + username), options)
      .toPromise()
      .then(res => res.json().following as string[])
      .then(res => console.log(res))  //  followers after adding
      .catch(this.handleError);
  }

  addArticle(content: string, picture?: string): Promise<number> {
    const body = JSON.stringify({text: content, img: picture});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers,
      withCredentials: true,
      body: body
    }); // Create a request option
    return this.http.request(url('/article'), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  addComment(username: string, content: string, id: string, commentID: string): Promise<number> {
    const body = JSON.stringify({username: username, text: content, id: id, commentID: commentID});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    }); // Create a request option
    return this.http.request(url('/articles/' + id), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  editHeadline(headline: string) {
    const body = JSON.stringify({
      headline: headline
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    });
    this.http.request(url('/headline'), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  editEmail(email: string) {
    const body = JSON.stringify({
      email: email
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    });
    this.http.request(url('/email'), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  editZipcode(zipcode: string) {
    const body = JSON.stringify({
      zipcode: zipcode
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    });
    this.http.request(url('/zipcode'), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  editAvatar(avatar: string) {
    const body = JSON.stringify({
      avatar: avatar
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    });
    this.http.request(url('/avatar'), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  getHeadline(username: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url('/headlines/' + username), options)
      .toPromise()
      .then(response => response.json().headline as string[])
      .catch(this.handleError);
  }

  getEmail(username: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url('/email/' + username), options)
      .toPromise()
      .then(response => response.json().email as string[])
      .catch(this.handleError);
  }

  getZipcode(username: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url('/zipcode/' + username), options)
      .toPromise()
      .then(response => response.json().zipcode as string[])
      .catch(this.handleError);
  }

  getDob(username: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url('/dob/' + username), options)
      .toPromise()
      .then(response => response.json().dob as string[])
      .catch(this.handleError);
  }

  getAvatar(username: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers, withCredentials: true});
    return this.http.get(url('/avatar/' + username), options)
      .toPromise()
      .then(response => response.json().avatar as string[])
      .catch(this.handleError);
  }

  updateArticle(articleId: string, text: string, id: string) {
    const body = JSON.stringify({text: text, id: articleId});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    }); // Create a request option
    return this.http.request(url('/articles/' + id), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }

  updateComment(articleId: string, text: string, id: string, commentId: string) {
    const body = JSON.stringify({text: text, id: articleId, commentId: commentId});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers,
      withCredentials: true,
      body: body
    }); // Create a request option
    return this.http.request(url('/articles/' + id), options)
      .toPromise()
      .then(res => console.log(res.json()))
      .catch(this.handleError);
  }
}
