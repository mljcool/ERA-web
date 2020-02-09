import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import {
    AngularFirestoreCollection,
    AngularFirestore
} from "@angular/fire/firestore";
import { IProductModel } from "../models/itemsClass.model";
import { map } from "rxjs/operators";
import { categories } from "../constants/categories";
import { GetUserDataService } from "app/shared/services/getUserData.service";

@Injectable()
export class ShopProductsService implements Resolve<any> {
    products: any[];
    onProductsChanged: BehaviorSubject<any>;
    private dbPath = "/items";

    productRef: AngularFirestoreCollection<IProductModel> = null;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private db: AngularFirestore,
        private _GetUserDataService: GetUserDataService
    ) {
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
        this.productRef = db.collection(this.dbPath);
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getProducts()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getProductLists(): AngularFirestoreCollection<IProductModel> {
        return this.productRef;
    }

    getProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection<IProductModel>("items", ref => {
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
                    this.products = lisOfItems.map(item => {
                        item.categoryByname = categories.find(
                            cat => cat.value === item.category
                        ).name;
                        return item;
                    });
                    this.onProductsChanged.next(this.products);
                    resolve(lisOfItems);
                    console.log(lisOfItems);
                }, reject);
        });
    }

    addNewProducts(itemData: IProductModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.productRef
                .add({ ...itemData })
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(false);
                });
        });
    }

    updateProduct(itemData: IProductModel): Promise<boolean> {
        console.log(itemData);
        return new Promise((resolve, reject) => {
            this.productRef
                .doc(itemData.key)
                .update(this.repolisher(itemData))
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(false);
                });
        });
    }

    repolisher(itemData: IProductModel): any {
        const cleanUp = { ...itemData };
        delete cleanUp.key;
        return cleanUp;
    }
}
