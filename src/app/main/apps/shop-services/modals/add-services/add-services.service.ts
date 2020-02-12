import { Injectable } from "@angular/core";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { map } from "rxjs/operators";
import { MechanicModels } from "../../mechanics/mechanics.model";
import * as moment from "moment";
import { IServicesModel } from "../../models/services.model";

@Injectable()
export class MyShopServices {
    mechanics: MechanicModels[];
    private dbPath = "/services";
    servicesRef: AngularFirestoreCollection<IServicesModel> = null;
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
                    this.mechanics = lisOfItems;
                    resolve(this.mechanics);
                }, reject);
        });
    }

    addNewServices(servicesData: IServicesModel): Promise<boolean> {
        servicesData.uid = this._GetUserDataService.getUserDataStorage.uid;
        return new Promise((resolve, reject) => {
            this.servicesRef
                .add({ ...servicesData })
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(false);
                });
        });
    }
    repolisher(itemData: IServicesModel): any {
        const cleanUp = { ...itemData };
        delete cleanUp.key;
        return cleanUp;
    }
}
