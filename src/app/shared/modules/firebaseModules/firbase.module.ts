import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FirebaseUIModule } from "firebaseui-angular";
import { environment } from "environments/environment";
import { firebaseUiAuthConfig } from "./sign-in-setup/firebaseUiAuthConfig";

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase),
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
        AngularFireAuthModule
    ],
    exports: [CommonModule, AngularFireAuthModule]
})
export class FireBaseSharedModule {}
