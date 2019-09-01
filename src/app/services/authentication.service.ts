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
          this.authenticationState.next(false);
        }
      }
    })
  }

  setToken(token) {
    this.storage.set(TOKEN_KEY, token);
    this.user = this.helper.decodeToken(token);
    this.authenticationState.next(true);
  }

  register(credentials) {
    return this.http.post(`${this.url}/butterfly-srv/user/create`, credentials)
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(e => {
          if (e.error.error) {
            this.showAlert(e.error.error);
          } else {
            this.showAlert('Something went wrong');
          }
          throw new Error(e)
        })
      )
  }

  login(credentials) {
    return this.http.post(`${this.url}/butterfly-srv/user/login`, credentials)
      .pipe(
        tap((res: any) => {
          const { data } = res;
          this.setToken(data.access_token);
          this.storage.set('userId', data.userId);
        }),
        catchError(e => {
          this.showAlert(e.error.error);
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