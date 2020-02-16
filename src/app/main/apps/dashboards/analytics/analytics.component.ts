import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";
import { ProjectDashboardService } from "./analytics.service";
import { AssistanceService } from "app/shared/services/roadAssistance.service";

@Component({
    selector: "analytics-dashboard",
    templateUrl: "./analytics.component.html",
    styleUrls: ["./analytics.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit {
    widgets: any;
    widget1SelectedYear = "2016";
    widget5SelectedDay = "today";
    latitude = 7.0514;
    longitude = 125.594772;
    markers: Marker[] = [];

    constructor(
        private _analyticsDashboardService: ProjectDashboardService,
        private _AssistanceService: AssistanceService
    ) {
        this._AssistanceService
            .getAllPendigAssistance()
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

    assistanceDetails(): void {}
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
