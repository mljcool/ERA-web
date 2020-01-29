import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
    providedIn: "root"
})
export class GetUserDataService {
    private _userInformation: IUser | any;
    private _isLogin: boolean;

    private dbPath = "/users";
    private userFullName: string;
    userRef: AngularFirestoreCollection<IUser> = null;

    constructor(private db: AngularFirestore) {
        this.userRef = db.collection(this.dbPath);
    }

    initUserInformation(data): void {
        const parseUserData: IUser = this.userDataParser(data);
        this._userInformation = parseUserData;
        this.setloginStatus(true);
    }

    getUserInformation(uid: string): Observable<any> {
        return this.userRef.doc(uid).valueChanges();
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

    userDataParser(user: object): IUser {
        return { ...JSON.parse(JSON.stringify(user)) };
    }
}
