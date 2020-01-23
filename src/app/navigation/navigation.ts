import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "applications",
        title: "Applications",
        type: "group",
        icon: "apps",
        children: [
            {
                id: "analytics",
                title: "Dashboard",
                type: "item",
                url: "/apps/dashboards/analytics",
                icon: "dashboard"
            },
            {
                id: "calendar",
                title: "Bookings",
                type: "item",
                icon: "today",
                url: "/apps/calendar"
            },
            {
                id: "mail",
                title: "Messages",
                type: "item",
                icon: "email",
                url: "/apps/mail",
                badge: {
                    title: "25",
                    bg: "#F44336",
                    fg: "#FFFFFF"
                }
            },

            {
                id: "clients",
                title: "Clients",
                type: "item",
                icon: "account_box",
                url: "/apps/contacts"
            }
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
                icon: "today",
                url: ""
            },
            {
                id: "academy",
                title: "My Services",
                type: "item",
                icon: "school",
                url: "/apps/academy"
            },
            {
                id: "academy",
                title: "Popular Promotional Items",
                type: "item",
                icon: "school",
                url: ""
            }
        ]
    }
];
