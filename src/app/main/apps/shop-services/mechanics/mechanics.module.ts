import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { MyMechanicComponent } from "./mechanics.component";
import { ContactsService } from "./mechanics.service";
import { MechanicListComponent } from "./mechanics-list/mechanic-list.component";
import { ContactsMainSidebarComponent } from "./sidebars/main/main.component";
import { MechanicFormDialogComponent } from "./mechanics-form/mechanic-form.component";
import { ContactsSelectedBarComponent } from "./selected-bar/selected-bar.component";
import { environment } from "environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MaterialModule } from "@fuse/material.module";

const routes: Routes = [
    {
        path: "**",
        component: MyMechanicComponent,
        resolve: {
            contacts: ContactsService
        }
    }
];

@NgModule({
    declarations: [
        MyMechanicComponent,
        MechanicListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        MechanicFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MaterialModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
    providers: [ContactsService],
    entryComponents: [MechanicFormDialogComponent]
})
export class MechanicsModule {}
