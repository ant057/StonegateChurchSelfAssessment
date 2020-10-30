// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyCw0E_FhtIvaQjZmm_METJSOOj0LpphErg',
    authDomain: 'tony-robinson-self-awareness.firebaseapp.com',
    databaseURL: 'https://tony-robinson-self-awareness.firebaseio.com',
    projectId: 'tony-robinson-self-awareness',
    storageBucket: 'tony-robinson-self-awareness.appspot.com',
    messagingSenderId: '861276784040',
    appId: '1:861276784040:web:7e40ee2085e596c690c99d',
    measurementId: 'G-EYW89YT0GC'
  },
  firebaseFunctionsUrl: 'https://us-central1-tony-robinson-self-awareness.cloudfunctions.net/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
