import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw'

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',

  });

  api_url: string = 'https://codetodo.xyz/api/v1';


  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }

  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { headers: this.headers})
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headers}
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson);
  }

  complete(path: string, body): Observable<any> {
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.headers}
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson);
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]))
  }
}
