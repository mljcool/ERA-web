import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { IAutoShopsUser } from "../models/autoShopsOwner.model";
import { Observable } from "rxjs";
import { GetUserDataService } from "./getUserData.service";

@Injectable({
    providedIn: "root"
})
export class RegisterUser {
    private dbPath = "/users";
    private userFullName: string;
    userRef: AngularFirestoreCollection<IUser> = null;

    constructor(
        private _afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private _GetUserDataService: GetUserDataService
    ) {
        this.userRef = db.collection(this.dbPath);
    }

    registerShopUser(
        email: string,
        password: string,
        name: string
    ): Promise<any> {
        this.userFullName = name;
        return new Promise<any>((resolve, reject) => {
            this._afAuth.auth
                .createUserWithEmailAndPassword(email, password)
                .then(
                    response => {
                        resolve(response);
                    },
                    error => reject(error)
                );
        });
    }

    createUserToFirebase(userShop: IUser): Promise<any> {
        const setUserData: IUser = {
            email: userShop.email,
            uid: userShop.uid,
            isShopRegistered: false,
            displayName: this.userFullName || userShop.displayName,
            photoURL: userShop.photoURL || ""
        };
        return this.userRef.doc(userShop.uid).set({ ...setUserData });
    }

    checkIfRegistered(): Promise<any> {
        return new Promise((resolve, reject) => {
            Promise.all([this.checkShopUserAndCreateData()]).then(([files]) => {
                resolve();
            }, reject);
        });
    }

    checkShopUserAndCreateData(): Promise<any> {
        const uid: string = this._GetUserDataService.getUserData.uid;
        return this.db.firestore
            .doc(`${this.dbPath}/${uid}`)
            .get()
            .then(response => {
                if (!response.exists) {
                    this.createUserToFirebase(
                        this._GetUserDataService.getUserData
                    );
                }
            });
    }
}
