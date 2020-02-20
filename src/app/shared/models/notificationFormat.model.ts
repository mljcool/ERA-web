interface ExtraInformation {
    extra_information: string;
    myId: string;
    refIds: string;
    typeRoute: string;
}

interface Notification {
    title: string;
    text: string;
    click_action?: string;
}

export interface NotificationMessage {
    to: string;
    data: ExtraInformation;
    notification: Notification;
    priority: string;
}

// const dataUser = {
//     to:
//         "/topics/"+data.userId
//     ,
//     data: {
//         extra_information: "This is some extra information"
//     },
//     notification: {
//         title: "NEW NOTIFICATION!",
//         text: "Click me to open an Activity!",
//         click_action: "SOMEACTIVITY"
//     }
// };
