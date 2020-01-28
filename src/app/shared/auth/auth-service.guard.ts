import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanLoad,
    Router,
    Route,
    UrlSegment
} from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})
export class AuthServiceGuard implements CanLoad {
    isUserLogin: boolean;

    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        this.afAuth.authState.subscribe(user => {
            const userLogin = JSON.parse(JSON.stringify(user));
            if (userLogin.uid) {
                this.isUserLogin = true;
                this.router.navigate(["/apps/dashboards/analytics"]);
            }
        });
        return this.isUserLogin;
        // return this.auths.userIsAuthenticated;
    }
}
