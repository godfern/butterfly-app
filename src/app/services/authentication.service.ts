import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = environment.url;
  registerUrl = 'http://localhost:3000';
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private storage: Storage, private plt: Platform, private helper: JwtHelperService, 
    private alertController: AlertController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.authenticationState.next(true);
        }
      }
    })
  }

  register(credentials) {
    // return this.http.post(`${this.url}/api/register`, credentials).pipe(
    //   catchError(e => {
    //     this.showAlert(e.error.msg);
    //     throw new Error(e)
    //   })
    // )

    return this.http.post(`${this.registerUrl}/butterfly-srv/user/create`, credentials)
    .pipe(
      tap(res => {
        this.showAlert(res);
      }),
      catchError(e => {
        this.showAlert(e.error.error);
        throw new Error(e)
      })
    )
  }

  login(credentials) {
    // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(true);
    // });

    return this.http.post(`${this.url}/api/login`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e)
        })
      )
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  getSpecialData() {
    return this.http.get(`${this.url}/api/special`).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorised for this');
          this.logout();
        }
        throw new Error(e)
      })
    )
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
