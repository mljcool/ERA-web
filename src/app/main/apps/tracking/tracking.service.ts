import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import {
    AngularFirestoreCollection,
    AngularFirestore
} from "@angular/fire/firestore";
import { IAssistance } from "app/shared/models/assistance.model";
import { map } from "rxjs/operators";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { ICustomer } from "app/shared/models/customer.model";

@Injectable()
export class TrackingCustomerService implements Resolve<any> {
    projects: any[];
    widgets: any[];

    onAssistanceChanged: BehaviorSubject<any>;
    onCustomerDatahanged: BehaviorSubject<any>;

    assistanceRef: AngularFirestoreCollection<IUser> = null;
    private dbPath = "/roadSideAssistance";

    constructor(private _httpClient: HttpClient, private db: AngularFirestore) {
        this.assistanceRef = db.collection(this.dbPath);
        this.onAssistanceChanged = new BehaviorSubject([]);
        this.onCustomerDatahanged = new BehaviorSubject([]);
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        const id: string = route.queryParams.id;
        const userId: string = route.queryParams.userId;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getWidgets(),
                this.getAllPendingAssistance(id),
                this.getCustomer(userId)
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("api/project-dashboard-widgets")
                .subscribe((response: any) => {
                    this.widgets = response;
                    resolve(response);
                }, reject);
        });
    }

    getAllPendingAssistance(idParams: string): Promise<IAssistance[]> {
        return new Promise((resolve, reject) => {
            this.db
                .collection<IAssistance>("roadSideAssistance", ref => {
                    const query: firebase.firestore.Query = ref;

                    return query.where("id", "==", idParams);
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
                .subscribe(data => {
                    this.onAssistanceChanged.next(data);
                    resolve(data);
                }, reject);
        });
    }

    getCustomer(idParams: string): Promise<ICustomer[]> {
        console.log(idParams);
        return new Promise((resolve, reject) => {
            this.db
                .collection<ICustomer>("customerUser", ref => {
                    const query: firebase.firestore.Query = ref;

                    return query.where("id", "==", idParams);
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
                .subscribe(data => {
                    this.onCustomerDatahanged.next(data);
                    resolve(data);
                }, reject);
        });
    }

    respondAssitance(key: string, assistanceData: any): Promise<any> {
        return this.assistanceRef.doc(key || "").update({ ...assistanceData });
    }
}
