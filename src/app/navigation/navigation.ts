import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "applications",
        title: "Applications",
        type: "group",
        icon: "apps",
        children: [
            // {
            //     id: "analytics",
            //     title: "Dashboard",
            //     type: "item",
            //     url: "/apps/dashboards/analytics",
            //     icon: "dashboard"
            // }
            // {
            //     id: "calendar",
            //     title: "Bookings",
            //     type: "item",
            //     icon: "today",
            //     url: "/apps/calendar"
            // },
            // {
            //     id: "orders",
            //     title: "Orders",
            //     type: "item",
            //     icon: "today",
            //     url: "/apps/calendar"
            // },
            // {
            //     id: "clients",
            //     title: "Customers",
            //     type: "item",
            //     icon: "account_box",
            //     url: "/apps/contacts"
            // },
            // {
            //     id: "mail",
            //     title: "Feedback",
            //     type: "item",
            //     icon: "star",
            //     url: "/apps/mail"
            // }
        ]
    },
    {
        id: "autoShops",
        title: "About My Shop",
        type: "group",
        icon: "apps",
        children: [
            {
                id: "calendar",
                title: "Shop info",
                type: "item",
                icon: "directions_car",
                url: "/apps/shop-information"
            }
            // {
            //     id: "academy",
            //     title: "My Services",
            //     type: "item",
            //     icon: "local_car_wash",
            //     url: "/apps/academy"
            // },
            // {
            //     id: "academy",
            //     title: "Featured Items",
            //     type: "item",
            //     icon: "local_offer",
            //     url: "/apps/academy"
            // }
        ]
    }
];
