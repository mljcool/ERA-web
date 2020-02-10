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
import { MechanicListComponent } from "./mechanics-list/contact-list.component";
import { ContactsMainSidebarComponent } from "./sidebars/main/main.component";
import { MechanicFormDialogComponent } from "./mechanics-form/contact-form.component";
import { ContactsSelectedBarComponent } from "./selected-bar/selected-bar.component";

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

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [ContactsService],
    entryComponents: [MechanicFormDialogComponent]
})
export class MechanicsModule {}
