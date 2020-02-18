import { AgmMapModule } from "@fuse/agMap.module";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FuseSharedModule } from "@fuse/shared.module";

import { RegisteredComponent } from "./registered/registered.component";
import { FirstVisitComponent } from "./first-visit/first-visit.component";
import { ShopInformationComponent } from "./shop-information.component";
import { ShopInfoService } from "./shop-info.service";
import { MaterialModule } from "@fuse/material.module";

const routes = [
    {
        path: "",
        component: ShopInformationComponent
    }
];

@NgModule({
    declarations: [
        RegisteredComponent,
        FirstVisitComponent,
        ShopInformationComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        AgmMapModule,
        CommonModule,
        MaterialModule,
        FuseSharedModule
    ],
    providers: [ShopInfoService]
})
export class ShopInformationModule {}
