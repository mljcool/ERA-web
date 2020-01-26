import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})
export class LogoutService {
    constructor(private afAuth: AngularFireAuth) {}

    logout(): void {
        this.afAuth.auth.signOut();
    }
}
