import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { GetUserDataService } from "./getUserData.service";
import { map } from "rxjs/operators";
import { IAssistance } from "../models/assistance.model";

@Injectable({
    providedIn: "root"
})
export class AssistanceService {
    onAssistanceChanged: BehaviorSubject<any>;
    assistanceRef: AngularFirestoreCollection<IUser> = null;
    private dbPath = "/roadSideAssistance";
    private uid = "";
    constructor(
        private db: AngularFirestore,
        private _GetUserDataService: GetUserDataService
    ) {
        this.onAssistanceChanged = new BehaviorSubject([]);
        this.assistanceRef = db.collection(this.dbPath);
        this.uid = (
            this._GetUserDataService.getUserDataStorage || { uid: "" }
        ).uid;
    }

    getAllPendingAssistance(): Observable<IAssistance[]> {
        return this.db
            .collection<IAssistance>("roadSideAssistance", ref => {
                const query: firebase.firestore.Query = ref;

                return query
                    .where("shopId", "==", this.uid)
                    .where("status", "==", "PENDING");
            })
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(c => ({
                        key: c.payload.doc.id,
                        ...c.payload.doc.data()
                    }))
                )
            );
    }

    getAllPendingOrder(): Observable<any[]> {
        return this.db
            .collection<any>("orders", ref => {
                const query: firebase.firestore.Query = ref;

                return query
                    .where("shopId", "==", this.uid)
                    .where("status", "==", "PENDING");
            })
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(c => ({
                        key: c.payload.doc.id,
                        ...c.payload.doc.data()
                    }))
                )
            );
    }

    getAllPendingBookings(): Observable<any[]> {
        return this.db
            .collection<any>("booking", ref => {
                const query: firebase.firestore.Query = ref;

                return query
                    .where("disposableData.uid", "==", this.uid)
                    .where("extraData.status", "==", "PENDING");
            })
            .snapshotChanges()
            .pipe(
                map(changes =>
                    changes.map(c => ({
                        key: c.payload.doc.id,
                        ...c.payload.doc.data()
                    }))
                )
            );
    }

    getCarModel(userId: string): Promise<any> {
        return this.db.firestore.doc(`customerVehicle/${userId || ""}`).get();
    }

    respondAssitance(key: string, assistanceData: any): Promise<any> {
        return this.assistanceRef.doc(key || "").update({ ...assistanceData });
    }
}
