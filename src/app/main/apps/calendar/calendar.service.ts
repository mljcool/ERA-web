import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import {
    AngularFirestoreCollection,
    AngularFirestore
} from "@angular/fire/firestore";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { map } from "rxjs/operators";
import * as _moment from "moment";

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from "date-fns";

export interface IBooking {
    start: string | any;
    end: string | any;
    title: string;
    allDay: boolean;
    color: {
        primary: string;
        secondary: string;
    };
    resizable: {
        beforeStart: boolean;
        afterEnd: boolean;
    };
    draggable: boolean;
    meta: {
        location: string;
        notes: string;
    };
    extraData: {
        customerData: string;
        status: string;
        referenceId: string;
        startTime: string;
    };
    disposableData: any;
}
@Injectable()
export class CalendarService implements Resolve<any> {
    events: any;
    onEventsUpdated: Subject<any>;

    bookings: any[];
    onProductsChanged: BehaviorSubject<any>;
    private dbPath = "/booking";

    productRef: AngularFirestoreCollection<IBooking> = null;

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
        this.onEventsUpdated = new Subject();
        this.productRef = db.collection(this.dbPath);
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
            Promise.all([this.getEvents()]).then(([events]: [any]) => {
                resolve();
            }, reject);
        });
    }

    // getEvents(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient
    //             .get("api/calendar/events")
    //             .subscribe((response: any) => {
    //                 console.log(response);
    //                 this.events = response.data;
    //                 this.onEventsUpdated.next(this.events);
    //                 resolve(this.events);
    //             }, reject);
    //     });
    // }

    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
    getEvents(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection<IBooking>("booking", ref => {
                    const query: firebase.firestore.Query = ref;

                    return query.where(
                        "disposableData.uid",
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
                .subscribe(response => {
                    const bookingHolder = {
                        id: "events",
                        data: response
                    };

                    this.events = bookingHolder.data.map(item => {
                        item.start = startOfDay(new Date(item.start.toDate()));
                        item.end = new Date(item.end.toDate());
                        return item;
                    });
                    console.log(this.events);
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post("api/calendar/events", {
                    id: "events",
                    data: [...events]
                })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }
}
