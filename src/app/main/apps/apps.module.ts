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
        path: "mail",
        loadChildren: "./mail/mail.module#MailModule"
    },
    {
        path: "chat",
        loadChildren: "./chat/chat.module#ChatModule"
    },
    {
        path: "calendar",
        loadChildren: "./calendar/calendar.module#CalendarModule"
    },
    {
        path: "e-commerce",
        loadChildren: "./e-commerce/e-commerce.module#EcommerceModule"
    },
    {
        path: "shop-services",
        loadChildren: "./shop-services/shop-services.module#ShopServicesModule"
    },
    {
        path: "contacts",
        loadChildren: "./contacts/contacts.module#ContactsModule"
    },
    {
        path: "shop-information",
        loadChildren:
            "./shop-information/shop-information.module#ShopInformationModule"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class AppsModule {}
