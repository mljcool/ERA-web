import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MechanicModels } from "../mechanics.model";

@Component({
    selector: "mechanic-form-dialog",
    templateUrl: "./mechanic-form.component.html",
    styleUrls: ["./mechanic-form.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MechanicFormDialogComponent {
    action: string;
    mechanic: MechanicModels;
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<MechanicFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<MechanicFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === "edit") {
            this.dialogTitle = "Edit Data";
            this.mechanic = _data.mechanic;
        } else {
            this.dialogTitle = "New Mechanic";
            this.mechanic = new MechanicModels({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create mechanic form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.mechanic.id],
            name: [this.mechanic.name],
            lastName: [this.mechanic.lastName],
            avatar: [this.mechanic.avatar],
            nickname: [this.mechanic.nickname],
            email: [this.mechanic.email],
            phone: [this.mechanic.phone],
            address: [this.mechanic.address],
            birthday: [this.mechanic.birthday],
            notes: [this.mechanic.notes]
        });
    }
}
