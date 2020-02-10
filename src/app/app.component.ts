import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Platform } from "@angular/cdk/platform";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";

import { FuseConfigService } from "@fuse/services/config.service";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseSplashScreenService } from "@fuse/services/splash-screen.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { navigation } from "app/navigation/navigation";
import { locale as navigationEnglish } from "app/navigation/i18n/en";
import { locale as navigationTurkish } from "app/navigation/i18n/tr";
import { CrudServiceShop } from "./shared/services/crudShopOwner.service";

import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddDetailsComponent } from "./shared/dialogs/shops/add-details/add-details.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { GetUserDataService } from "./shared/services/getUserData.service";
import { RegisterUser } from "./shared/services/regUser.service";
import { WipModalComponent } from "./shared/dialogs/wip/wip-modal/wip-modal.component";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _router: Router,
        private _CrudServiceShop: CrudServiceShop,
        public dialog: MatDialog,
        private _GetUserDataService: GetUserDataService
    ) {
        // CHECKING USER STATUSES

        this.builtInConfigurationFUSE();
        this.addNavigations();
        const urls = ["/auth", "/register", "/apps/shop-information"];

        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                const selectedURLs = urls.some(x => x === event.url);
                console.log("selectedURLs", selectedURLs);
                if (!selectedURLs) {
                    this._GetUserDataService
                        .iniTializeUserData()
                        .then(granted => {
                            console.log(granted);
                            if (granted) {
                                this.checkUserNotYetProvidedShopInfo();
                            }
                        });
                }
                this.checkIfUserIsLogin(event.url);
            });
    }

    checkUserNotYetProvidedShopInfo(): void {
        const loginStatus = this._GetUserDataService.loginStatus;
        const userdata = this._GetUserDataService.getUserData;
        this._CrudServiceShop.checkShopUser(userdata).then(reponse => {
            if (loginStatus) {
                if (!reponse.exists) {
                    this.openDialogIfnotExist();
                }
            }
        });
    }

    checkIfUserIsLogin(url: string): void {
        this._GetUserDataService.checkifStillLogin().then(response => {
            const urls = ["/auth", "/register"];
            const selectedURLs = urls.some(x => x === url);
            console.log("selectedURLsselectedURLs", selectedURLs);
            if (selectedURLs && !!response.uid) {
                this._router.navigate(["/apps/shop-information"]);
            }
        });
    }

    openDialogIfnotExist(): void {
        const dialog = this.dialog.open(AddDetailsComponent, {
            height: "auto",
            width: "auto",
            disableClose: true
        });
        dialog.afterClosed().subscribe(result => {
            this._router.navigate(["/apps/shop-information"]);
        });
    }

    ngOnInit(): void {
        // Subscribe to config changes

        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(config => {
                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === "boxed") {
                    this.document.body.classList.add("boxed");
                } else {
                    this.document.body.classList.remove("boxed");
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith("theme-")) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    underMaintenanceModal(): void {
        const dialog = this.dialog.open(WipModalComponent, {
            height: "auto",
            width: "auto"
        });
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    addNavigations(): void {
        const customFunctionNavItem = [
            {
                id: "calendar",
                title: "Bookings",
                type: "item",
                icon: "today",
                url: "/apps/calendar"
            },
            {
                id: "orders",
                title: "Orders",
                type: "item",
                icon: "shopping_basket",
                url: "/apps/shop-services/orders",
                exactMatch: true
                // function: () => {
                //     this.underMaintenanceModal();
                // }
            },

            {
                id: "clients",
                title: "Customers",
                type: "item",
                icon: "account_box",
                url: "/apps/customers"
            }
        ];

        const shopInformations = [
            {
                id: "shop-services",
                title: "My Services",
                type: "item",
                icon: "local_car_wash",
                url: "/apps/shop-services/list-services",
                exactMatch: true
                // function: () => {
                //     this.underMaintenanceModal();
                // }
            },
            {
                id: "academy",
                title: "Featured Items",
                type: "item",
                icon: "local_offer",
                url: "/apps/shop-services/list-items",
                exactMatch: true
                // function: () => {
                //     this.underMaintenanceModal();
                // }
            },
            {
                id: "academy",
                title: "My Mechanic",
                type: "item",
                icon: "supervisor_account",
                url: "/apps/mechanics"
            }
        ];

        shopInformations.forEach(item => {
            this._fuseNavigationService.addNavigationItem(item, "autoShops");
        });

        customFunctionNavItem.forEach(items => {
            this._fuseNavigationService.addNavigationItem(
                items,
                "applications"
            );
        });
    }

    builtInConfigurationFUSE(): void {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register("main", this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation("main");

        // Add languages
        this._translateService.addLangs(["en", "tr"]);

        // Set the default language
        this._translateService.setDefaultLang("en");

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(
            navigationEnglish,
            navigationTurkish
        );

        // Use a language
        this._translateService.use("en");

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add("is-mobile");
        }

        this._fuseConfigService.config = {
            layout: {
                width: "boxed"
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
}
