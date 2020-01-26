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
import { Login2Component } from "app/main/pages/authentication/login-2/login-2.component";
import { FireBaseSharedModule } from "app/shared/modules/firebaseModules/firbase.module";
import { AngularFireModule } from "@angular/fire";
import { FirebaseUIModule } from "firebaseui-angular";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { firebaseUiAuthConfig } from "app/shared/modules/firebaseModules/sign-in-setup/firebaseUiAuthConfig";
import { environment } from "environments/environment";

const routes = [
    {
        path: "",
        component: Login2Component
    }
];

@NgModule({
    declarations: [Login2Component],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
        AngularFireModule.initializeApp(environment.firebase),
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
        AngularFireAuthModule
    ]
})
export class Login2Module {}
