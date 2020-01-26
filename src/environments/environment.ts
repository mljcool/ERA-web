// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    firebase: {
        apiKey: "AIzaSyD10f5E626mufA9ns3WeKW8DlRYU1yJ2zY",
        authDomain: "era-capstone.firebaseapp.com",
        databaseURL: "https://era-capstone.firebaseio.com",
        projectId: "era-capstone",
        storageBucket: "era-capstone.appspot.com",
        messagingSenderId: "547833775708",
        appId: "1:547833775708:web:3442cb80ad85a1d9aa0899",
        measurementId: "G-GQVNFZ8P97"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
