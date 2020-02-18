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
    MatAutocompleteModule,
    MatProgressBarModule
} from "@angular/material";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";
import { ChartsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

import { AnalyticsDashboardComponent } from "app/main/apps/dashboards/analytics/analytics.component";
import { ProjectDashboardService } from "app/main/apps/dashboards/analytics/analytics.service";
import { RespondAssistanceComponent } from "./modals/respond-assistance/respond-assistance.component";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { ShopInfoService } from "../../shop-information/shop-info.service";

const routes: Routes = [
    {
        path: "**",
        component: AnalyticsDashboardComponent,
        resolve: {
            data: ProjectDashboardService
        }
    }
];

@NgModule({
    declarations: [AnalyticsDashboardComponent, RespondAssistanceComponent],
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
        AgmDirectionModule,
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
        MatProgressBarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,

        FuseSharedModule,
        FuseWidgetModule,
        MatBadgeModule
    ],
    providers: [ProjectDashboardService, ShopInfoService],
    entryComponents: [RespondAssistanceComponent]
})
export class AnalyticsDashboardModule {}
