import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { RegisterUser } from "./regUser.service";

@Injectable({
    providedIn: "root"
})
export class GetUserDataService {
    onUserChanges: BehaviorSubject<any>;

    private _userInformation: IUser | any;
    private _isLogin: boolean;

    private dbPath = "/users";
    private userFullName: string;
    userRef: AngularFirestoreCollection<IUser> = null;

    constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
        this.userRef = db.collection(this.dbPath);

        this.onUserChanges = new BehaviorSubject({});
    }

    getUserInformation(uid: string): Observable<any> {
        console.log("culprit-6");
        return this.userRef.doc(uid || "").valueChanges();
    }

    setloginStatus(status: boolean): void {
        this._isLogin = status;
    }

    get getUserData(): IUser {
        return this._userInformation;
    }

    get loginStatus(): boolean {
        return this._isLogin;
    }
    get getUserDataStorage(): IUser {
        return JSON.parse(localStorage.getItem("user"));
    }

    userDataParser(user: object): IUser | any {
        return { ...JSON.parse(JSON.stringify(user)) };
    }

    createUserToFirebase(userShop: any): Promise<any> {
        const setUserData: IUser = {
            email: userShop.email,
            uid: userShop.uid,
            isShopRegistered: false,
            displayName: this.userFullName || userShop.displayName,
            photoURL: userShop.photoURL || ""
        };
        return this.userRef.doc(userShop.uid || "").set({ ...setUserData });
    }

    checkUserIfExistOrNotAndCreateData(uid: string): Promise<any> {
        return this.db.firestore.doc(`${this.dbPath}/${uid || ""}`).get();
    }

    checkifStillLogin(): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged(response => {
                const userDataRes = this.userDataParser(response);
                resolve(userDataRes);
            });
        });
    }

    reloadUserInformation(): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this.afAuth.authState.subscribe(response => {
                const userDataRes = this.userDataParser(response);
                this.getUserInformation(userDataRes.uid).subscribe(user => {
                    resolve(user);
                });
            });
        });
    }

    iniTializeUserData(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                this.afAuth.authState.subscribe(response => {
                    if (response) {
                        const userDataRes = this.userDataParser(response);
                        this.checkUserIfExistOrNotAndCreateData(
                            response.uid
                        ).then(userCheck => {
                            if (!userCheck.exists) {
                                this.createUserToFirebase(userDataRes).then(
                                    () => {
                                        this._isLogin = true;
                                        this.getUserInformation(
                                            userDataRes.uid
                                        ).subscribe(user => {
                                            this.onUserChanges.next(user);
                                            this._userInformation = user;
                                            localStorage.setItem(
                                                "user",
                                                JSON.stringify(user)
                                            );
                                            resolve(true);
                                        });
                                    }
                                );
                            } else {
                                this._isLogin = true;
                                this.getUserInformation(
                                    userDataRes.uid
                                ).subscribe(user => {
                                    this.onUserChanges.next(user);
                                    this._userInformation = user;
                                    localStorage.setItem(
                                        "user",
                                        JSON.stringify(user)
                                    );
                                    resolve(true);
                                });
                            }
                        });
                    }
                });
            }, 1000);
        });
    }
}
