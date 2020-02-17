import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    MatAutocompleteModule
} from "@angular/material";
import { AgmCoreModule } from "@agm/core";
import { ChartsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { TrackingCustomerComponent } from "./tracking.component";
import { TrackingCustomerService } from "./tracking.service";

const routes: Routes = [
    {
        path: "**",
        component: TrackingCustomerComponent,
        resolve: {
            data: TrackingCustomerService
        }
    }
];

@NgModule({
    declarations: [TrackingCustomerComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,

        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08"
        }),
        ChartsModule,
        NgxChartsModule,

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
        MatExpansionModule,
        MatAutocompleteModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,

        FuseSharedModule,
        FuseWidgetModule,
        MatBadgeModule
    ],
    providers: [TrackingCustomerService]
})
export class TrackingModule {}
