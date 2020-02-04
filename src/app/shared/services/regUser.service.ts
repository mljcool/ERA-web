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
                    (response: any) => {
                        const parseUserData = this._GetUserDataService.userDataParser(
                            response
                        );
                        const params = {
                            ...parseUserData.user,
                            ...{
                                displayName: this.userFullName
                            }
                        };
                        this._GetUserDataService
                            .createUserToFirebase(params)
                            .then(() => {
                                resolve(response);
                            });
                    },
                    error => reject(error)
                );
        });
    }

    checkUserIfExistOrNotAndCreateData(userDataRes: IUser): Promise<any> {
        const uid: string = userDataRes.uid;
        return this.db.firestore.doc(`${this.dbPath}/${uid || ""}`).get();
    }

    loginUser(email: string, password: string): Promise<any> {
        return this._afAuth.auth.signInWithEmailAndPassword(email, password);
    }
}
