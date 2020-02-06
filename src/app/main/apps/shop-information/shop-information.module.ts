import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSnackBarModule,
    MatSortModule,
    MatProgressBarModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";

import { RegisteredComponent } from "./registered/registered.component";
import { FirstVisitComponent } from "./first-visit/first-visit.component";
import { ShopInformationComponent } from "./shop-information.component";
import { AgmCoreModule } from "@agm/core";
import { ShopInfoService } from "./shop-info.service";

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
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08",
            libraries: ["places"]
        }),

        CommonModule,

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatChipsModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSnackBarModule,
        MatSortModule,
        MatProgressBarModule,
        FuseSharedModule
    ],
    providers: [ShopInfoService]
})
export class ShopInformationModule {}
