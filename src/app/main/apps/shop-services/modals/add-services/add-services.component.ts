import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { IServicesModel } from "../../models/services.model";
import { categories } from "../../constants/categories";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { MyShopServices } from "./add-services.service";
import Swal from "sweetalert2";

export interface User {
    id: string | number;
    name: string;
}
@Component({
    selector: "app-add-services",
    templateUrl: "./add-services.component.html",
    styleUrls: ["./add-services.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [MyShopServices]
})
export class AddServicesComponent implements OnInit {
    action: string;
    product: IServicesModel;
    servicesForm: FormGroup;
    dialogTitle: string;
    categories: any[];
    myControl = new FormControl();
    options: User[];
    filteredOptions: Observable<User[]>;
    isSaving = false;

    constructor(
        public matDialogRef: MatDialogRef<AddServicesComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _MyShopServices: MyShopServices
    ) {
        this.action = _data.action;

        if (this.action === "edit") {
            this.dialogTitle = "Edit Service";
            this.product = _data.product;
        } else {
            this.dialogTitle = "New Service";
            this.product = new IServicesModel({});
        }
        this.servicesForm = this.createServiceForm();
        this.categories = categories;
        this._MyShopServices.getAllMechanics().then(response => {
            this.options = response;
            if (response) {
                this.filteredOptions = this.myControl.valueChanges.pipe(
                    startWith(""),
                    map(value =>
                        typeof value === "string" ? value : value.name
                    ),
                    map(name =>
                        name ? this._filter(name) : this.options.slice()
                    )
                );
            }
        });
    }

    ngOnInit(): void {}

    displayFn(user: User): string {
        return user && user.name ? user.name : "";
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(
            option => option.name.toLowerCase().indexOf(filterValue) === 0
        );
    }

    getSelectedMechanic(data: User): void {
        this.servicesForm.patchValue({ mechanic: data.id });
    }

    createServiceForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.product.id],
            name: [this.product.name],
            price: [this.product.price],
            mechanic: [this.product.mechanic],
            category: [this.product.category],
            estimatedTime: [this.product.estimatedTime],
            description: [this.product.description]
        });
    }

    saveAndUpdate(): void {
        this.isSaving = true;
        const updateProductData = {
            ...this.product,
            active: true,
            ...this.servicesForm.getRawValue()
        };

        this._MyShopServices
            .addNewServices(this._MyShopServices.repolisher(updateProductData))
            .then(response => {
                if (response) {
                    Swal.fire(
                        "Success!",
                        "Item Added successfully!",
                        "success"
                    );
                    this.matDialogRef.close(["save", updateProductData]);
                }
            });
    }
}
