import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Orders } from "../orders.service";
import { map } from "rxjs/operators";
import {
    AngularFirestoreCollection,
    AngularFirestore
} from "@angular/fire/firestore";

@Injectable()
export class OrderDetailService implements Resolve<any> {
    routeParams: any;
    order: any;
    onOrderChanged: BehaviorSubject<any>;
    private dbPath = "/orders";
    ordersRef: AngularFirestoreCollection<any> = null;

    constructor(private _httpClient: HttpClient, private db: AngularFirestore) {
        this.onOrderChanged = new BehaviorSubject({});
        this.ordersRef = db.collection(this.dbPath);
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([this.getOrder()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getOrder(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection<Orders>("orders", ref => {
                    const query: firebase.firestore.Query = ref;

                    return query.where("reference", "==", this.routeParams.id);
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
                    this.order = response[0];
                    this.onOrderChanged.next(this.order);
                    resolve(response[0]);
                }, reject);
        });
    }

    updateOrder(data: any): Promise<any> {
        const params = {
            colorMobile: data.colorMobile,
            colorWeb: data.colorWeb,
            status: data.status
        };
        return this.ordersRef.doc(this.order.key || "").update(params);
    }
}
