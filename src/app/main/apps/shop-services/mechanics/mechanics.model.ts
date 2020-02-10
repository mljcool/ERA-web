import { FuseUtils } from "@fuse/utils";

export class MechanicModels {
    id: string;
    uid: string;
    key: string;
    name: string;
    lastName: string;
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
            this.uid = contact.uid || "";
            this.key = contact.key || "";
            this.name = contact.name || "";
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
