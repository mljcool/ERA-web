import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { IAutoShopsUser } from "../models/autoShopsOwner.model";

@Injectable({
    providedIn: "root"
})
export class CrudServiceShop {
    private dbPath = "/autoShop";

    userShopRef: AngularFirestoreCollection<IAutoShopsUser> = null;

    constructor(private db: AngularFirestore) {
        this.userShopRef = db.collection(this.dbPath);
    }

    createUserShop(userShop: IAutoShopsUser): Promise<any> {
        console.log("culprit-4");
        return this.userShopRef.doc(userShop.uid || "").set({ ...userShop });
    }

    checkShopUser(user: IUser): Promise<any> {
        const uid: string = user.uid || "";
        console.log("culprit-5", uid);
        return this.db.firestore.doc(`/autoShop/${uid}`).get();
    }

    updateCustomer(key: string, value: any): Promise<void> {
        return this.userShopRef.doc(key).update(value);
    }

    deleteCustomer(key: string): Promise<void> {
        return this.userShopRef.doc(key).delete();
    }

    getShopUserList(): AngularFirestoreCollection<IAutoShopsUser> {
        return this.userShopRef;
    }

    getUserData(): IUser {
        return JSON.parse(localStorage.getItem("user"));
    }
}
