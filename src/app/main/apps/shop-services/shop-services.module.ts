import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import {
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatToolbarModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";

import { ListOfServicesComponent } from "app/main/apps/shop-services/list-services/list-services.component";
import { FuseSidebarModule } from "@fuse/components";
import { ListItemsComponent } from "./list-items/list-items.component";
import { ShopProductsService } from "./list-items/list-items.service";
import { ShopOrdersService } from "./orders/orders.service";
import { ShopOrdersComponent } from "./orders/orders.component";
import { AcademyCoursesService } from "./courses.service";
import { AddProductComponent } from "./modals/add-product/add-product.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "environments/environment";

const routes = [
    {
        path: "list-services",
        component: ListOfServicesComponent
    },
    {
        path: "orders",
        component: ShopOrdersComponent,
        resolve: {
            data: ShopOrdersService
        }
    },
    {
        path: "list-items",
        component: ListItemsComponent,
        resolve: {
            data: ShopProductsService
        }
    }
];

@NgModule({
    declarations: [
        ListOfServicesComponent,
        ListItemsComponent,
        ShopOrdersComponent,
        AddProductComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSidebarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
    providers: [AcademyCoursesService, ShopProductsService, ShopOrdersService],
    entryComponents: [AddProductComponent]
})
export class ShopServicesModule {}
