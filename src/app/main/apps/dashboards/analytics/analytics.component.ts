import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";
import { ProjectDashboardService } from "./analytics.service";

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

    constructor(private _analyticsDashboardService: ProjectDashboardService) {
        // Register the custom chart.js plugin
    }

    ngOnInit(): void {
        // Get the widgets from the service
        // this.widgets = this._analyticsDashboardService.widgets;
        this.widgets = this._analyticsDashboardService.widgets;
    }
}
