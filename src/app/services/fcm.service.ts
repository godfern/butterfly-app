import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FcmService {

  constructor(private fcm: FCM,
              private afs: AngularFirestore,
              private platform: Platform) {}

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
      token = await this.fcm.getToken();
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
}