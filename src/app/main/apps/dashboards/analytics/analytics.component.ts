import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";
import { ProjectDashboardService } from "./analytics.service";
import { AssistanceService } from "app/shared/services/roadAssistance.service";
import { MatDialog } from "@angular/material";
import { FormGroup } from "@angular/forms";
import { RespondAssistanceComponent } from "./modals/respond-assistance/respond-assistance.component";

@Component({
    selector: "analytics-dashboard",
    templateUrl: "./analytics.component.html",
    styleUrls: ["./analytics.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit {
    widgets: any;
    dialogRef: any;
    latitude = 7.0514;
    longitude = 125.594772;
    markers: Marker[] = [];

    constructor(
        private _analyticsDashboardService: ProjectDashboardService,
        private _AssistanceService: AssistanceService,
        private _matDialog: MatDialog
    ) {
        this._AssistanceService
            .getAllPendingAssistance()
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
    }

    ngOnInit(): void {
        // Get the widgets from the service
        // this.widgets = this._analyticsDashboardService.widgets;
        this.widgets = this._analyticsDashboardService.widgets;
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
