import { Router } from "@angular/router";
import { startWith, map } from "rxjs/operators";
import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { AssistanceService } from "app/shared/services/roadAssistance.service";
import { fuelType } from "@fuse/constants/fuelTypes";
import { Observable } from "rxjs";
import { hrsList } from "@fuse/constants/hrsList";
import Swal from "sweetalert2";

export interface ITime {
    hours: string;
}

@Component({
    selector: "app-respond-assistance",
    templateUrl: "./respond-assistance.component.html",
    styleUrls: ["./respond-assistance.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class RespondAssistanceComponent implements OnInit {
    myControl = new FormControl();
    options: ITime[] = hrsList();
    filteredOptions: Observable<ITime[]>;
    data: any;
    assistanceForm: FormGroup;
    assistance: any = {};
    carModel: any;
    panelOpenState = false;
    isLoading = false;
    constructor(
        public matDialogRef: MatDialogRef<RespondAssistanceComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _AssistanceService: AssistanceService,
        private router: Router
    ) {
        this.assistance = _data;
        this.assistanceForm = this.createassistanceForm();
        this._AssistanceService
            .getCarModel(_data.assistanceData.myId)
            .then(carModel => {
                this.carModel = {
                    ...carModel.data(),
                    fuelType: fuelType(carModel.data().fuelType)
                };
                console.log(this.carModel);
            });

        console.log(this.assistance);
    }

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.hours)),
            map(hours => (hours ? this._filter(hours) : this.options.slice()))
        );
    }

    displayFn(user: ITime): string {
        return user && user.hours ? user.hours : "";
    }

    private _filter(hours: string): ITime[] {
        const filterValue = hours.toLowerCase();

        return this.options.filter(
            option => option.hours.toLowerCase().indexOf(filterValue) === 0
        );
    }

    getSelectedMechanic(data: ITime): void {
        this.assistanceForm.patchValue({ escalatedTime: data.hours });
    }

    createassistanceForm(): FormGroup {
        return this._formBuilder.group({
            escalatedTime: ["", [Validators.required]],
            flatRate: ["", [Validators.required]],
            notes: [this.assistance.assistanceData.note]
        });
    }
    accepted(): void {
        this.isLoading = true;
        const formValue = {
            ...this.assistanceForm.getRawValue(),
            status: "ACCEPTED"
        };
        const key = this.assistance.assistanceData.key;
        console.log(formValue);

        this._AssistanceService.respondAssitance(key, formValue).then(resp => {
            Swal.fire(
                "Accepted!",
                "This customer will receive a notification",
                "success"
            );
            this.router
                .navigate(["/apps/tracking-customer"], {
                    queryParams: {
                        id: this.assistance.assistanceData.id,
                        userId: this.assistance.assistanceData.myId
                    }
                })
                .then(() => {
                    this.isLoading = false;
                    this.matDialogRef.close();
                });
        });
    }
}
