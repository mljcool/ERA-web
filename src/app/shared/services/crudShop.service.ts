import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { IAutoShopsUser } from "../models/autoShops.model";

@Injectable({
    providedIn: "root"
})
export class CrudServiceShop {
    private dbPath = "/autoShop";

    userShopRef: AngularFirestoreCollection<IAutoShopsUser> = null;

    constructor(private db: AngularFirestore) {
        this.userShopRef = db.collection(this.dbPath);
    }

    createUserShop(userShop: IAutoShopsUser): void {
        this.userShopRef.add({ ...userShop });
    }

    checkShopUser(): Promise<any> {
        const uid: string = this.getUserData().uid;
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

    deleteAll(): void {
        this.userShopRef.get().subscribe(
            querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                });
            },
            error => {
                console.log("Error: ", error);
            }
        );
    }

    getUserData(): IUser {
        return JSON.parse(localStorage.getItem("user"));
    }
}
