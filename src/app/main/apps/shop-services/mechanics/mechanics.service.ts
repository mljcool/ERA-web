import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { FuseUtils } from "@fuse/utils";
import { MechanicModels } from "./mechanics.model";
import {
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import * as moment from "moment";
import { map } from "rxjs/operators";

@Injectable()
export class ContactsService implements Resolve<any> {
    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    mechanics: MechanicModels[];
    user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

    private dbPath = "/mechanic";

    mechanicRef: AngularFirestoreCollection<MechanicModels> = null;

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
        this.mechanicRef = db.collection(this.dbPath);
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
            Promise.all([this.getAllMechanics(), this.getUserData()]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getAllMechanics();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        console.log("filter :", filter);
                        this.getAllMechanics();
                    });

                    resolve();
                },
                reject
            );
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
                    this.mechanics = lisOfItems;

                    if (this.filterBy === "starred") {
                        this.mechanics = this.mechanics.filter(_contact => {
                            return this.user.starred.includes(_contact.id);
                        });
                    }

                    if (this.filterBy === "frequent") {
                        this.mechanics = this.mechanics.filter(_contact => {
                            return this.user.frequentContacts.includes(
                                _contact.id
                            );
                        });
                    }

                    if (this.searchText && this.searchText !== "") {
                        this.mechanics = FuseUtils.filterArrayByString(
                            this.mechanics,
                            this.searchText
                        );
                    }

                    this.mechanics = this.mechanics.map(contact => {
                        return new MechanicModels(contact);
                    });

                    this.onContactsChanged.next(this.mechanics);
                    resolve(this.mechanics);
                }, reject);
        });
    }

    /**
     * Get mechanics
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("api/contacts-contacts")
                .subscribe((response: any) => {
                    this.mechanics = response;

                    if (this.filterBy === "starred") {
                        this.mechanics = this.mechanics.filter(_contact => {
                            return this.user.starred.includes(_contact.id);
                        });
                    }

                    if (this.filterBy === "frequent") {
                        this.mechanics = this.mechanics.filter(_contact => {
                            return this.user.frequentContacts.includes(
                                _contact.id
                            );
                        });
                    }

                    if (this.searchText && this.searchText !== "") {
                        this.mechanics = FuseUtils.filterArrayByString(
                            this.mechanics,
                            this.searchText
                        );
                    }

                    this.mechanics = this.mechanics.map(contact => {
                        return new MechanicModels(contact);
                    });

                    this.onContactsChanged.next(this.mechanics);
                    resolve(this.mechanics);
                }, reject);
        });
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("api/contacts-user/5725a6802d10e277a0f35724")
                .subscribe((response: any) => {
                    this.user = response;
                    this.onUserDataChanged.next(this.user);
                    resolve(this.user);
                }, reject);
        });
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedContact(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedContacts.length > 0) {
            const index = this.selectedContacts.indexOf(id);

            if (index !== -1) {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContacts.push(id);

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedContacts.length > 0) {
            this.deselectContacts();
        } else {
            this.selectContacts();
        }
    }

    /**
     * Select mechanics
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void {
        this.selectedContacts = [];

        // If there is no filter, select all mechanics
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedContacts = [];
            this.mechanics.map(contact => {
                this.selectedContacts.push(contact.id);
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    addNewMechanic(mechanicData: MechanicModels): Promise<boolean> {
        mechanicData.birthday = moment(mechanicData.birthday)
            .format("DD-MM-YYYY")
            .toString();
        mechanicData.uid = this._GetUserDataService.getUserDataStorage.uid;
        mechanicData.status = true;

        return new Promise((resolve, reject) => {
            this.mechanicRef
                .add({ ...mechanicData })
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(false);
                });
        });
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post("api/contacts-contacts/" + contact.id, { ...contact })
                .subscribe(response => {
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post("api/contacts-user/" + this.user.id, { ...userData })
                .subscribe(response => {
                    this.getUserData();
                    this.getContacts();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect mechanics
     */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void {
        const contactIndex = this.mechanics.indexOf(contact);
        this.mechanics.splice(contactIndex, 1);
        this.onContactsChanged.next(this.mechanics);
    }

    /**
     * Delete selected mechanics
     */
    deleteSelectedContacts(): void {
        for (const contactId of this.selectedContacts) {
            const contact = this.mechanics.find(_contact => {
                return _contact.id === contactId;
            });
            const contactIndex = this.mechanics.indexOf(contact);
            this.mechanics.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.mechanics);
        this.deselectContacts();
    }
}
