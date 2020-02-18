import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { CompletedAssistanceComponent } from "./completed.component";
import { environment } from "environments/environment";
import { MaterialModule } from "@fuse/material.module";
import { CompletedAssistanceService } from "./completed.service";

const routes: Routes = [
    {
        path: "**",
        component: CompletedAssistanceComponent,
        resolve: {
            contacts: CompletedAssistanceService
        }
    }
];

@NgModule({
    declarations: [CompletedAssistanceComponent],
    imports: [
        RouterModule.forChild(routes),

        MaterialModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
    providers: [CompletedAssistanceService]
})
export class CompletedAssistanceModule {}
