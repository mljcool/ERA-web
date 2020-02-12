import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { map } from "rxjs/operators";
import { IServicesModel } from "../models/services.model";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { MechanicModels } from "../mechanics/mechanics.model";

@Injectable()
export class MyListShopServices {
    private dbPath = "/services";
    servicesRef: AngularFirestoreCollection<IServicesModel> = null;
    onListServicesChanged: BehaviorSubject<any>;
    onMechanicChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {AngularFirestore} db
     */
    constructor(
        private db: AngularFirestore,
        private _GetUserDataService: GetUserDataService
    ) {
        this.servicesRef = db.collection(this.dbPath);
        this.onListServicesChanged = new BehaviorSubject({});
        this.onMechanicChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getAllServices(), this.getAllMechanics()]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getAllServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection<IServicesModel>("services", ref => {
                    const query: firebase.firestore.Query = ref;

                    return query.where(
                        "uid",
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
                .subscribe(lisOfItems => {
                    this.onListServicesChanged.next(lisOfItems);
                    resolve(lisOfItems);
                }, reject);
        });
    }

    getAllMechanics(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection<MechanicModels>("mechanic", ref => {
                    const query: firebase.firestore.Query = ref;

                    return query.where(
                        "uid",
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
                .subscribe(lisOfItems => {
                    this.onMechanicChanged.next(lisOfItems);
                    resolve(lisOfItems);
                }, reject);
        });
    }
}
