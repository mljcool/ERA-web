import { FuseUtils } from "@fuse/utils";

export class MechanicModels {
    id: string;
    name: string;
    lastName: string;
    avatar: string;
    nickname: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;
    status: boolean;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact) {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.name = contact.name || "";
            this.avatar = contact.avatar || "assets/images/avatars/profile.jpg";
            this.nickname = contact.nickname || "";
            this.email = contact.email || "";
            this.phone = contact.phone || "";
            this.address = contact.address || "";
            this.birthday = contact.birthday || "";
            this.notes = contact.notes || "";
            this.status = contact.status || false;
        }
    }
}
