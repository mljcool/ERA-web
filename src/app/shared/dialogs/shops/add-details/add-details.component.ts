import { Component, OnInit, Inject } from "@angular/core";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "app-add-details",
    templateUrl: "./add-details.component.html",
    styleUrls: ["./add-details.component.scss"]
})
export class AddDetailsComponent implements OnInit {
    data: any = {};
    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: any,
        public _GetUserDataService: GetUserDataService,
        public dialogRef: MatDialogRef<AddDetailsComponent>
    ) {
        this.data = _data;
        console.log(this.data);
    }

    ngOnInit(): void {}

    closeDialog(): void {
        this.dialogRef.close();
    }
}
