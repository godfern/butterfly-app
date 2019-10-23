import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';

// import { FcmService } from './services/fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    // private fcm: FcmService,
    public toastController: ToastController,
    public fcm: FCM
  ) {

    this.initializeApp();
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    
    // this.fcm.getToken();
    this.fcm.onNotification().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });

    this.fcm.getToken().then(token => {
      // Your best bet is to here store the token on the user's profile on the
      // Firebase database, so that when you want to send notifications to this
      // specific user you can do it from Cloud Functions.
      console.log('----token----');
      console.log(token)
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();

      this.languageService.setInitialAppLanguage();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }
}
