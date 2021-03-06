// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url:'http://ec2-3-14-88-194.us-east-2.compute.amazonaws.com:3000',
  // url: 'http://localhost:3000',
  // url: 'http://192.168.1.103:3000',
  // url: 'http://localhost:3000',
  firebase : {
    apiKey: 'AIzaSyBQBC1ILhrVyJrIDfFNcmJH09UyxiFLGVI',
    authDomain: 'butterflyapp-f8f14.firebaseapp.com',
    databaseURL: 'https://butterflyapp-f8f14.firebaseio.com/',
    projectId: 'butterflyapp-f8f14',
    storageBucket: 'gs://butterflyapp-f8f14.appspot.com/',
    messagingSenderId: '1075267288376'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
