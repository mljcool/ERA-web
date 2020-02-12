import { IProducts } from "./../../models/items.models";
import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IProductModel } from "../../models/itemsClass.model";
import { categories } from "../../constants/categories";

@Component({
    selector: "app-add-product",
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit {
    action: string;
    product: IProductModel;
    productForm: FormGroup;
    dialogTitle: string;
    categories: any[];

    constructor(
        public matDialogRef: MatDialogRef<AddProductComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        this.action = _data.action;

        if (this.action === "edit") {
            this.dialogTitle = "Edit Product";
            this.product = _data.product;
        } else {
            this.dialogTitle = "New Product";
            this.product = new IProductModel({});
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
            quantity: [this.product.quantity],
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
