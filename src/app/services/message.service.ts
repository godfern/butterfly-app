import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // url = environment.url;
  url = 'http://demo4471636.mockable.io';
  

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) { }

  sendMessage(payload) {

    return this.http.post(`${this.url}/butterfly-srv/message/sendMessage`, payload)
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(e => {
          return e;
          // this.showAlert(e.error.error);
          // throw new Error(e)
        })
      )
  }

  scheduleMessage(payload) {
    return this.http.post(`${this.url}/butterfly-srv/message/scheduleMessage`, payload)
      .pipe(
        tap(res => {
          return res;
        }),
        catchError(e => {
          return e;
          // this.showAlert(e.error.error);
          // throw new Error(e)
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
