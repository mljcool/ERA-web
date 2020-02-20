import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

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
import { AddServicesComponent } from "./modals/add-services/add-services.component";
import { MyListShopServices } from "./list-services/list-services.service";
import { MaterialModule } from "@fuse/material.module";
import { OrderDetailsComponent } from "./orders/order-details/order.component";
import { AgmMapModule } from "@fuse/agMap.module";
import { OrderDetailService } from "./orders/order-details/order.service";
import { ShopInfoService } from "../shop-information/shop-info.service";

const routes = [
    {
        path: "list-services",
        component: ListOfServicesComponent,
        resolve: {
            data: MyListShopServices
        }
    },
    {
        path: "orders",
        component: ShopOrdersComponent,
        resolve: {
            data: ShopOrdersService
        }
    },
    {
        path: "order-details/:id",
        component: OrderDetailsComponent,
        resolve: {
            data: OrderDetailService
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
        AddProductComponent,
        AddServicesComponent,
        OrderDetailsComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,

        FuseSharedModule,
        FuseSidebarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AgmMapModule
    ],
    providers: [
        AcademyCoursesService,
        ShopProductsService,
        ShopOrdersService,
        OrderDetailService,
        MyListShopServices,
        ShopInfoService
    ],
    entryComponents: [AddProductComponent, AddServicesComponent]
})
export class ShopServicesModule {}
