import { IAssistance } from "app/shared/models/assistance.model";
import { ICustomer } from "./../../../shared/models/customer.model";
import { takeUntil } from "rxjs/operators";
import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";
import { TrackingCustomerService } from "./tracking.service";
import { AssistanceService } from "app/shared/services/roadAssistance.service";
import { MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: "tracking-customer",
    templateUrl: "./tracking.component.html",
    styleUrls: ["./tracking.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TrackingCustomerComponent implements OnInit, OnDestroy {
    widgets: any;
    dialogRef: any;
    latitude = 7.0514;
    longitude = 125.594772;
    markers: Marker[] = [];
    assistanceData: IAssistance;
    customerData: ICustomer;
    private unsubscribeAll: Subject<any>;

    constructor(
        private _trackingCustomerService: TrackingCustomerService,
        private _matDialog: MatDialog
    ) {
        this.unsubscribeAll = new Subject();
        this._trackingCustomerService.onAssistanceChanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(assistanceData => {
                this.assistanceData = assistanceData[0];
                this.markers = [];
                assistanceData.forEach(element => {
                    this.markers.push({
                        lat: element.mylocation.latitude,
                        lng: element.mylocation.longitude,
                        draggable: false,
                        assistanceData: element,
                        label: element.assistanceType.label,
                        iconUrl: {
                            url: "assets/img/markers/blue-moving-car.gif",
                            scaledSize: {
                                height: 80,
                                width: 110
                            }
                        }
                    });
                });
            });

        this._trackingCustomerService.onCustomerDatahanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(customerData => {
                this.customerData = customerData[0];
                console.log("customerData", customerData);
            });
    }

    ngOnInit(): void {
        // Get the widgets from the service
        // this.widgets = this._analyticsDashboardService.widgets;
        this.widgets = this._trackingCustomerService.widgets;
    }

    assistanceDetails(dataAssistance: any): void {
        //     this.dialogRef = this._matDialog.open(RespondAssistanceComponent, {
        //         panelClass: "respond-form-dialog",
        //         data: dataAssistance
        //     });
        //     this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
        //         if (!response) {
        //             return;
        //         }
        //         // this._contactsService.updateContact(response.getRawValue());
        //     });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    markToDone(data: IAssistance): void {
        console.log(data);
        if (!data.confirmationStatus) {
            Swal.fire(
                "Oppps!",
                `You can't marke this to done unless customer already confirmed`,
                "error"
            );
            return;
        }
        const params = {
            status: "DONE"
        };
        this._trackingCustomerService
            .respondAssitance(data.key, params)
            .then(() => {
                Swal.fire("Yeheey!", `Job well done`, "success");
            });
    }
}

interface CustomMarkersAndSize {
    url: string;
    scaledSize: {
        width: number;
        height: number;
    };
}
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    shopName?: string;
    draggable: boolean;
    iconUrl: CustomMarkersAndSize;
    assistanceData?: any;
}
