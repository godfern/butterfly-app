import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Platform, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  registerUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private plt: Platform, private alertController: AlertController) { }

  sendOTP(credentials) {
    let params = { userId: credentials.id }
    return this.http.post(`${this.registerUrl}/butterfly-srv/user/initiate/verification`, params)
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

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
