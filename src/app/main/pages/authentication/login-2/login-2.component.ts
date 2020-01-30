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

import Swal from "sweetalert2";
import { RegisterUser } from "app/shared/services/regUser.service";
import { GetUserDataService } from "app/shared/services/getUserData.service";

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
        private afAuth: AngularFireAuth,
        private _RegisterUser: RegisterUser,
        private _GetUserDataService: GetUserDataService
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
        this.loginForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    login(): void {
        const { email = "", password = "" } = this.loginForm.value;
        this._RegisterUser
            .loginUser(email, password)
            .then(response => {
                this._GetUserDataService.iniTializeUserData().then(granted => {
                    if (granted) {
                        this._router.navigate(["/apps/dashboards/analytics"]);
                    }
                });
            })
            .catch(error => {
                Swal.fire("Issue!", error.message, "error");
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
