import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";
import { ProjectDashboardService } from "./analytics.service";
import { AssistanceService } from "app/shared/services/roadAssistance.service";
import { MatDialog } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { RespondAssistanceComponent } from "./modals/respond-assistance/respond-assistance.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ShopInfoService } from "../../shop-information/shop-info.service";
import { IAutoShopsUser } from "app/shared/models/autoShopsOwner.model";

@Component({
    selector: "analytics-dashboard",
    templateUrl: "./analytics.component.html",
    styleUrls: ["./analytics.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit, OnDestroy {
    widgets: any;
    dialogRef: any;
    latitude = 7.0514;
    longitude = 125.594772;
    markers: Marker[] = [];
    shopInformation: IAutoShopsUser;
    myLocations = {
        iconUrl: {
            url: "assets/img/markers/marker-shop.png",
            scaledSize: {
                height: 50,
                width: 40
            }
        }
    };

    public origin: any;
    public destination: any;

    public renderOptions = {
        suppressMarkers: true
    };
    markerOptions = {
        origin: {
            opacity: 0
        },
        destination: {
            opacity: 0
        }
    };
    private unsubscribeAll: Subject<any>;

    directionMapper: any[] = [];

    constructor(
        private _analyticsDashboardService: ProjectDashboardService,
        private _AssistanceService: AssistanceService,
        private _matDialog: MatDialog,
        private _ShopInfoService: ShopInfoService
    ) {
        this.unsubscribeAll = new Subject();
        this._AssistanceService
            .getAllPendingAssistance()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(assistanceData => {
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
        this._ShopInfoService.getShopInformations();
    }

    ngOnInit(): void {
        // Get the widgets from the service
        // this.widgets = this._analyticsDashboardService.widgets;
        this.widgets = this._analyticsDashboardService.widgets;
        this._ShopInfoService.onShopInfoChanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(myShop => {
                console.log("myShop", myShop);
                this.shopInformation = myShop;
                if (this.markers.length) {
                    this.markers.forEach(location => {
                        this.directionMapper.push({
                            origin: {
                                lat: this.shopInformation.functionalLocation
                                    .latitude,
                                lng: this.shopInformation.functionalLocation
                                    .longitude
                            },
                            destination: {
                                lat: location.lat,
                                lng: location.lng
                            }
                        });
                    });
                }
            });
    }

    assistanceDetails(dataAssistance: any): void {
        this.dialogRef = this._matDialog.open(RespondAssistanceComponent, {
            panelClass: "respond-form-dialog",
            data: dataAssistance
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            // this._contactsService.updateContact(response.getRawValue());
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
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
