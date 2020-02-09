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
import { ContactsComponent } from "./mechanics.component";
import { ContactsService } from "./mechanics.service";
import { ContactsContactListComponent } from "./mechanics-list/contact-list.component";
import { ContactsMainSidebarComponent } from "./sidebars/main/main.component";
import { ContactsContactFormDialogComponent } from "./mechanics-form/contact-form.component";
import { ContactsSelectedBarComponent } from "./selected-bar/selected-bar.component";

const routes: Routes = [
    {
        path: "**",
        component: ContactsComponent,
        resolve: {
            contacts: ContactsService
        }
    }
];

@NgModule({
    declarations: [
        ContactsComponent,
        ContactsContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        ContactsContactFormDialogComponent
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
    entryComponents: [ContactsContactFormDialogComponent]
})
export class MechanicsModule {}
