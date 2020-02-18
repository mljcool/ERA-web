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

import { CustomersService } from "app/main/apps/customers/customers.service";
import { CustomerListComponent } from "app/main/apps/customers/customer-list/customer-list.component";
import { ContactsSelectedBarComponent } from "app/main/apps/customers/selected-bar/selected-bar.component";
import { CustomerMainSidebarComponent } from "app/main/apps/customers/sidebars/main/main.component";
import { CustomerFormDialogComponent } from "app/main/apps/customers/customer-form/customer-form.component";
import { CustomersComponent } from "./customers.component";
import { MaterialModule } from "@fuse/material.module";

const routes: Routes = [
    {
        path: "**",
        component: CustomersComponent,
        resolve: {
            contacts: CustomersService
        }
    }
];

@NgModule({
    declarations: [
        CustomersComponent,
        CustomerListComponent,
        ContactsSelectedBarComponent,
        CustomerMainSidebarComponent,
        CustomerFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [CustomersService],
    entryComponents: [CustomerFormDialogComponent]
})
export class CustomersModule {}
