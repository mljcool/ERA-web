import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { CrudServiceShop } from "app/shared/services/crudShopOwner.service";

@Injectable()
export class ShopInfoService {
    onShopInfoChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private afAuth: AngularFireAuth,
        private userDataService: GetUserDataService,
        private _CrudServiceShop: CrudServiceShop
    ) {
        // Set the defaults
        this.onShopInfoChanged = new BehaviorSubject({});
    }

    getUserInformation(): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.onAuthStateChanged(
                response => {
                    const userData = this.userDataService.userDataParser(
                        response
                    );
                    resolve(userData);
                },
                err => {
                    reject(err);
                }
            );
        });
    }

    getShopInformations(): void {
        this.getUserInformation().then(response => {
            this._CrudServiceShop
                .getShopUserList()
                .doc(response.uid)
                .valueChanges()
                .subscribe(shopData => {
                    this.onShopInfoChanged.next(shopData);
                });
        });
    }
}
