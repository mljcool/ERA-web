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

    constructor(
        private db: AngularFirestore,
        private _GetUserDataService: GetUserDataService
    ) {
        this.onAssistanceChanged = new BehaviorSubject([]);
        this.assistanceRef = db.collection(this.dbPath);
    }

    getAllPendingAssistance(): Observable<IAssistance[]> {
        return this.db
            .collection<IAssistance>("roadSideAssistance", ref => {
                const query: firebase.firestore.Query = ref;

                return query
                    .where(
                        "shopId",
                        "==",
                        this._GetUserDataService.getUserDataStorage.uid
                    )
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
}
