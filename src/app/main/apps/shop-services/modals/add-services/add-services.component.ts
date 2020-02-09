import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IServicesModel } from "../../models/services.model";
import { categories } from "../../constants/categories";

@Component({
    selector: "app-add-services",
    templateUrl: "./add-services.component.html",
    styleUrls: ["./add-services.component.scss"]
})
export class AddServicesComponent implements OnInit {
    action: string;
    product: IServicesModel;
    productForm: FormGroup;
    dialogTitle: string;
    categories: any[];

    constructor(
        public matDialogRef: MatDialogRef<AddServicesComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        this.action = _data.action;

        if (this.action === "edit") {
            this.dialogTitle = "Edit Product";
            this.product = _data.product;
        } else {
            this.dialogTitle = "New Product";
            this.product = new IServicesModel({});
        }
        console.log("COOL", this.product);
        this.productForm = this.createProductForm();
        this.categories = categories;
    }

    ngOnInit(): void {}

    createProductForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.product.id],
            name: [this.product.name],
            price: [this.product.price],
            quantity: [this.product.mechanic],
            category: [this.product.category],
            description: [this.product.description]
        });
    }

    saveAndUpdate(): void {
        const updateProductData = {
            ...this.product,
            ...this.productForm.getRawValue()
        };
        this.matDialogRef.close(["save", updateProductData]);
    }
}
