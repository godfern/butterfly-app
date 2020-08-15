import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable()
export class FcmService {

  url = environment.url;
  user = null;

  constructor(private fcm: FCM,
              private afs: AngularFirestore,
              private platform: Platform,
              private http: HttpClient) {}

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.fcm.getToken();
      console.log('--------')
      console.log(token)
    }

    // if (this.platform.is('ios')) {
    //   token = await this.FCM.getToken();
    //   await this.FCM.grantPermission();
    // }

    if(this.platform.is('desktop')){
      // console.log('--------')
      token = await this.fcm.getToken();
      // console.log(token)
    }

    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');

    const data = {
      token,
      userId: 'testUserId'
    };

    return devicesRef.doc(token).set(data);
  }

  onNotifications() {
    return this.fcm.onNotification();
  }

  getDevices() { 
    return this.afs.collection('devices').snapshotChanges();
  }

  deleteDevice() {
    this.getDevices().subscribe(res =>  {
      res.forEach(element => {
        return this.afs.collection('devices').doc(element.payload.doc.id).delete();
      });
      
    })
  }

  saveFCMRemote(userId,token) {
    return this.http.put(`${this.url}/butterfly-srv/user/fcmids/${userId}`,{fcmIds: token})
    .pipe(
      tap((res: any) => {
        const { data } = res;
      }),
      catchError(e => {
        throw new Error(e)
      })
    )
  }
        
}