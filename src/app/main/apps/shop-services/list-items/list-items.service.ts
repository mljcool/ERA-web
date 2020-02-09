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
    constructor(private _httpClient: HttpClient, private db: AngularFirestore) {
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
        this.productRef = db.collection(this.dbPath);
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
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

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("api/e-commerce-products")
                .subscribe((response: any) => {
                    this.products = response;
                    console.log("products", this.products);
                    this.onProductsChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }

    addNewProducts(customer: IProductModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.productRef
                .add({ ...customer })
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(false);
                });
        });
    }
}
