import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";

import { Login2Component } from "app/main/pages/authentication/login-2/login-2.component";

const routes = [
    {
        path: "",
        component: Login2Component
    }
];

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: "redirect",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
            scopes: ["public_profile", "email", "user_likes", "user_friends"],
            customParameters: {
                auth_type: "reauthenticate"
            },
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
        }
    ],
    tosUrl: "<your-tos-link>",
    privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
    declarations: [Login2Component],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),

        FuseSharedModule
    ]
})
export class Login2Module {}
