import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { Router } from "@angular/router";
import {
    FirebaseUISignInSuccessWithAuthResult,
    FirebaseUISignInFailure
} from "firebaseui-angular";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
    selector: "login-2",
    templateUrl: "./login-2.component.html",
    styleUrls: ["./login-2.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private afAuth: AngularFireAuth
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            console.log(JSON.stringify(user));
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            }
        });

        this.loginForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    loginMaingPage(): void {
        this._router.navigate(["/apps/dashboards/analytics"]);
    }

    successCallback(
        signInSuccessData: FirebaseUISignInSuccessWithAuthResult
    ): void {
        console.log(signInSuccessData);
        this._router.navigate(["/apps/dashboards/analytics"]);
    }

    errorCallback(errorData: FirebaseUISignInFailure): void {
        console.log(errorData);
    }
}
