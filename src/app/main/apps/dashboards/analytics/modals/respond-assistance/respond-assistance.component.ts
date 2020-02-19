import { GlobalsServiceNotification } from "./../../../../../../shared/services/post-notification.service";
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
import { MyShopServices } from "app/main/apps/shop-services/modals/add-services/add-services.service";

export interface ITime {
    hours: string;
}
export interface MechanicFilter {
    id: string | number;
    name: string;
}

@Component({
    selector: "app-respond-assistance",
    templateUrl: "./respond-assistance.component.html",
    styleUrls: ["./respond-assistance.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class RespondAssistanceComponent implements OnInit {
    myControl = new FormControl();
    myControlMechanic = new FormControl();
    options: ITime[] = hrsList();
    filteredOptions: Observable<ITime[]>;

    mechanics: MechanicFilter[];
    filteredOptionsMechanic: Observable<MechanicFilter[]>;

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
        private router: Router,
        private _MyShopServices: MyShopServices,
        private _globalNotif: GlobalsServiceNotification
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

        this._MyShopServices.getAllMechanics().then(response => {
            this.mechanics = response;
            if (response) {
                this.filteredOptionsMechanic = this.myControlMechanic.valueChanges.pipe(
                    startWith(""),
                    map(value =>
                        typeof value === "string" ? value : value.name
                    ),
                    map(name =>
                        name ? this._filterMec(name) : this.mechanics.slice()
                    )
                );
            }
        });
    }

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.hours)),
            map(hours => (hours ? this._filter(hours) : this.options.slice()))
        );
    }
    // ---> For HRS autocomplete

    getSelectedHours(data: ITime): void {
        this.assistanceForm.patchValue({ escalatedTime: data.hours });
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
    // ---> END For HRS autocomplete

    displayFnMech(user: MechanicFilter): string {
        return user && user.name ? user.name : "";
    }

    private _filterMec(name: string): MechanicFilter[] {
        const filterValue = name.toLowerCase();

        return this.mechanics.filter(
            option => option.name.toLowerCase().indexOf(filterValue) === 0
        );
    }

    getSelectedMechanic(data: MechanicFilter): void {
        this.assistanceForm.patchValue({ assignedMechanic: data.id });
    }

    createassistanceForm(): FormGroup {
        return this._formBuilder.group({
            escalatedTime: ["", [Validators.required]],
            flatRate: ["", [Validators.required]],
            assignedMechanic: ["", [Validators.required]],
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
            const userIds = this.assistance.assistanceData.myId;
            const assId = this.assistance.assistanceData.id;
            this._globalNotif
                .notificationExecuter(userIds)
                .then(({ isExists, data }) => {
                    const token = data.token;

                    if (isExists) {
                        this._globalNotif
                            .postMethod({
                                to: token,
                                priority: "high",
                                notification: {
                                    title: "Roadside Assistance",
                                    text:
                                        "Your roadside assistance got accepted"
                                },
                                data: {
                                    extra_information: `Your roadside assistance got accepted`,
                                    assistanceId: assId,
                                    myId: userIds
                                }
                            })
                            .subscribe(data => {
                                console.log("notification", data);
                            });
                    }
                });

            this.router
                .navigate(["/apps/tracking-customer"], {
                    queryParams: {
                        id: this.assistance.assistanceData.id,
                        userId: userIds
                    }
                })
                .then(() => {
                    this.isLoading = false;
                    this.matDialogRef.close();
                });
        });
    }
}
