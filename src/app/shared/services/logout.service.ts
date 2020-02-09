import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { GetUserDataService } from "./getUserData.service";

@Injectable({
    providedIn: "root"
})
export class LogoutService {
    constructor(
        private afAuth: AngularFireAuth,
        private _GetUserDataService: GetUserDataService
    ) {}

    logout(): void {
        this.afAuth.auth.signOut();
        localStorage.clear();
        this._GetUserDataService.setloginStatus(false);
    }
}
