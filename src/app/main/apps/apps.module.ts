import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

const routes = [
    {
        path: "dashboards/analytics",
        loadChildren:
            "./dashboards/analytics/analytics.module#AnalyticsDashboardModule"
    },
    {
        path: "completed",
        loadChildren: "./completed/completed.module#CompletedAssistanceModule"
    },
    {
        path: "calendar",
        loadChildren: "./calendar/calendar.module#CalendarModule"
    },
    {
        path: "shop-services",
        loadChildren: "./shop-services/shop-services.module#ShopServicesModule"
    },
    {
        path: "customers",
        loadChildren: "./customers/customers.module#CustomersModule"
    },
    {
        path: "mechanics",
        loadChildren:
            "./shop-services/mechanics/mechanics.module#MechanicsModule"
    },
    {
        path: "shop-information",
        loadChildren:
            "./shop-information/shop-information.module#ShopInformationModule"
    },
    {
        path: "tracking-customer",
        loadChildren: "./tracking/tracking.module#TrackingModule"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class AppsModule {}
