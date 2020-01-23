import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule
} from "@angular/material";
import { AgmCoreModule } from "@agm/core";
import { ChartsModule } from "ng2-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

import { AnalyticsDashboardComponent } from "app/main/apps/dashboards/analytics/analytics.component";
import { ProjectDashboardService } from "app/main/apps/dashboards/analytics/analytics.service";

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
    declarations: [AnalyticsDashboardComponent],
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

        FuseSharedModule,
        FuseWidgetModule,
        MatBadgeModule
    ],
    providers: [ProjectDashboardService]
})
export class AnalyticsDashboardModule {}
