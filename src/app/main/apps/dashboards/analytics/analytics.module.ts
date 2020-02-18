import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

import { AnalyticsDashboardComponent } from "app/main/apps/dashboards/analytics/analytics.component";
import { ProjectDashboardService } from "app/main/apps/dashboards/analytics/analytics.service";
import { RespondAssistanceComponent } from "./modals/respond-assistance/respond-assistance.component";
import { FuseConfirmDialogModule, FuseSidebarModule } from "@fuse/components";
import { ShopInfoService } from "../../shop-information/shop-info.service";
import { MyShopServices } from "../../shop-services/modals/add-services/add-services.service";
import { AgmMapModule } from "@fuse/agMap.module";
import { MaterialModule } from "@fuse/material.module";

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
        AgmMapModule,
        MaterialModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        FuseSharedModule,
        FuseWidgetModule
    ],
    providers: [ProjectDashboardService, ShopInfoService, MyShopServices],
    entryComponents: [RespondAssistanceComponent]
})
export class AnalyticsDashboardModule {}
