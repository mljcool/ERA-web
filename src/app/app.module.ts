import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {
    MatButtonModule,
    MatIconModule,
    MatDialogModule
} from "@angular/material";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AngularFireModule } from "@angular/fire";
import {
    AngularFirestoreModule,
    FirestoreSettingsToken
} from "@angular/fire/firestore";
import { environment } from "../environments/environment";

import { FakeDbService } from "app/fake-db/fake-db.service";
import { AppComponent } from "app/app.component";
import { AppStoreModule } from "app/store/store.module";
import { LayoutModule } from "app/layout/layout.module";
import { AddDetailsComponent } from "./shared/dialogs/shops/add-details/add-details.component";
import { AuthServiceGuard } from "./shared/auth/auth-service.guard";
import { WipModalComponent } from "./shared/dialogs/wip/wip-modal/wip-modal.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "auth", pathMatch: "full" },
    {
        path: "auth",
        loadChildren:
            "./main/pages/authentication/login-2/login-2.module#Login2Module"
    },

    {
        path: "register",
        loadChildren:
            "./main/pages/authentication/register-2/register-2.module#Register2Module"
    },
    {
        path: "apps",
        loadChildren: "./main/apps/apps.module#AppsModule"
    },
    {
        path: "**",
        redirectTo: "apps/dashboards/analytics"
    }
];

@NgModule({
    declarations: [AppComponent, AddDetailsComponent, WipModalComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatDialogModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
    entryComponents: [AddDetailsComponent, WipModalComponent],
    providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
    bootstrap: [AppComponent]
})
export class AppModule {}
