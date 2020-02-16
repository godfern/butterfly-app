import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Platform, AlertController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  url = environment.url;

  constructor(
    private http: HttpClient,
    private plt: Platform,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) { }

  sendOTP(credentials) {
    let params = { userId: credentials.id }
    return this.http.post(`${this.url}/butterfly-srv/user/initiate/verification`, params)
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(e => {
          this.showAlert(e.error.error);
          throw new Error(e)
        })
      )
  }

  verifyOTP(otpDetails) {
    const { userId, accId, code } = otpDetails;
    let params = {
      "userId": userId,
      "accId": accId,
      "code": code
    }
    return this.http.post(`${this.url}/butterfly-srv/user/verify/otp`, params)
      .pipe(
        tap((res: any) => {
          const { data } = res;
          this.authService.setToken(data.access_token);
        }),
        catchError(e => {
          this.showAlert(e.error.error);
          throw new Error(e)
        })
      )
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
