import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
} from "@angular/material";

import { FuseSearchBarModule, FuseShortcutsModule } from "@fuse/components";
import { FuseSharedModule } from "@fuse/shared.module";

import { ToolbarComponent } from "app/layout/components/toolbar/toolbar.component";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LogoutService } from "app/shared/services/logout.service";
import { AngularFireModule } from "@angular/fire";
import { FirebaseUIModule } from "firebaseui-angular";
import { firebaseUiAuthConfig } from "app/shared/modules/firebaseModules/sign-in-setup/firebaseUiAuthConfig";
import { environment } from "environments/environment";

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        AngularFireModule.initializeApp(environment.firebase),
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
        AngularFireAuthModule
    ],
    exports: [ToolbarComponent],
    providers: [LogoutService]
})
export class ToolbarModule {}
