import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [

            {
                id: 'analytics',
                title: 'Dashboard',
                type: 'item',
                url: '/apps/dashboards/analytics',
                icon: 'dashboard',
            },
            {
                id: 'calendar',
                title: 'Bookings',
                type: 'item',
                icon: 'today',
                url: '/apps/calendar'
            },
            {
                id: 'academy',
                title: 'Academy',
                type: 'item',
                icon: 'school',
                url: '/apps/academy'
            },
            {
                id: 'mail',
                title: 'Messages',
                type: 'item',
                icon: 'email',
                url: '/apps/mail',
                badge: {
                    title: '25',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                }
            },

            {
                id: 'contacts',
                title: 'Contacts',
                type: 'item',
                icon: 'account_box',
                url: '/apps/contacts'
            },
        ]
    },
];
