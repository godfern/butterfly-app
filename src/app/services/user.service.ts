
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'access_token';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.get(TOKEN_KEY).then(token => {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + token);
    });
  }

  userByEmail(credentials) {
    const { emailId } = credentials;
    return this.http.get(`${this.url}/butterfly-srv/user/email/${emailId}`, httpOptions)
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(e => {
          throw new Error(e)
        })
      )
  }


  userById(credentials) {
    const { id } = credentials;
    return this.http.get(`${this.url}/butterfly-srv/user/${id}`, httpOptions)
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(e => {
          throw new Error(e)
        })
      )
  }
}
