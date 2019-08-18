
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url;
  user = null;

  constructor(private http: HttpClient) { }

  userByEmail(credentials) {
    const { emailId } = credentials;
    return this.http.get(`${this.url}/butterfly-srv/user/email/${emailId}`)
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
    return this.http.get(`${this.url}/butterfly-srv/user/${id}`)
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
