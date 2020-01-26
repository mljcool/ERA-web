import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})
export class GetUserDataService {
    constructor(private afAuth: AngularFireAuth) {}

    getUserData(): IUser {
        return JSON.parse(localStorage.getItem("user"));
    }
}
