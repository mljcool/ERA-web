import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import {
    AngularFirestoreCollection,
    AngularFirestore
} from "@angular/fire/firestore";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { map } from "rxjs/operators";

export interface Prod {
    id: string;
    name: string;
    price: string;
    quantity: number;
    total: string;
}

export interface Orders {
    reference?: string;
    shopId?: string;
    total: string;
    date?: any;
    status: string;
    customer?: {
        uid: string;
        name: string;
        shippingAddress?: {
            address: string;
            lat: number;
            lng: number;
        };
    };
    products: Array<Prod[]>;
    extraDetails: any;
    colorWeb: string;
    colorMobile: string;
}

@Injectable()
export class ShopOrdersService implements Resolve<any> {
    orders: any[];
    onOrdersChanged: BehaviorSubject<any>;

    private dbPath = "/orders";
    ordersRef: AngularFirestoreCollection<any> = null;

    constructor(
        private _httpClient: HttpClient,
        private db: AngularFirestore,
        private _GetUserDataService: GetUserDataService
    ) {
        // Set the defaults
        this.onOrdersChanged = new BehaviorSubject({});
        this.ordersRef = db.collection(this.dbPath);
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getOrders()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getOrders(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection<Orders>("orders", ref => {
                    const query: firebase.firestore.Query = ref;

                    return query.where(
                        "shopId",
                        "==",
                        this._GetUserDataService.getUserDataStorage.uid
                    );
                })
                .snapshotChanges()
                .pipe(
                    map(changes =>
                        changes.map(c => ({
                            key: c.payload.doc.id,
                            ...c.payload.doc.data()
                        }))
                    )
                )
                .subscribe(response => {
                    this.orders = response;
                    this.onOrdersChanged.next(this.orders);
                    resolve(response);
                    console.log(
                        this._GetUserDataService.getUserDataStorage.uid
                    );
                }, reject);
        });
    }
}
