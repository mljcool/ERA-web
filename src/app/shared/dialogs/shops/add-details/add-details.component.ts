import { Component, OnInit } from "@angular/core";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: "app-add-details",
    templateUrl: "./add-details.component.html",
    styleUrls: ["./add-details.component.scss"]
})
export class AddDetailsComponent implements OnInit {
    constructor(
        public _GetUserDataService: GetUserDataService,
        public dialogRef: MatDialogRef<AddDetailsComponent>
    ) {}

    ngOnInit(): void {}

    closeDialog(): void {
        this.dialogRef.close();
    }
}
