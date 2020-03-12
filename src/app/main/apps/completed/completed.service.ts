import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { IAssistance } from "app/shared/models/assistance.model";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class CompletedAssistanceService implements Resolve<any> {
    orders: any[];
    assistance: any[];
    onOrdersChanged: BehaviorSubject<any>;
    onAssitanceChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _GetUserDataService: GetUserDataService,
        private db: AngularFirestore
    ) {
        this.onOrdersChanged = new BehaviorSubject({});
        this.onAssitanceChanged = new BehaviorSubject([]);
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getOrders(),
                this.getAllPendingAssistance()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    getOrders(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("api/e-commerce-orders")
                .subscribe((response: any) => {
                    this.orders = response;
                    this.onOrdersChanged.next(this.orders);
                    resolve(response);
                }, reject);
        });
    }

    getAllPendingAssistance(): Promise<IAssistance[]> {
        return new Promise((resovle, reject) => {
            this.db
                .collection<IAssistance>("roadSideAssistance", ref => {
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
                .subscribe(dataResp => {
                    this.assistance = dataResp;
                    this.onAssitanceChanged.next(dataResp);
                    console.log(dataResp);
                    resovle(dataResp);
                });
        });
    }
}
