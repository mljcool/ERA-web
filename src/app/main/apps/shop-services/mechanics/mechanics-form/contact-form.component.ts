import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MechanicModels } from "../mechanics.model";

@Component({
    selector: "contacts-contact-form-dialog",
    templateUrl: "./contact-form.component.html",
    styleUrls: ["./contact-form.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MechanicFormDialogComponent {
    action: string;
    contact: MechanicModels;
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
            this.contact = _data.contact;
        } else {
            this.dialogTitle = "New Mechanic";
            this.contact = new MechanicModels({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.contact.id],
            name: [this.contact.name],
            lastName: [this.contact.lastName],
            avatar: [this.contact.avatar],
            nickname: [this.contact.nickname],
            email: [this.contact.email],
            phone: [this.contact.phone],
            address: [this.contact.address],
            birthday: [this.contact.birthday],
            notes: [this.contact.notes]
        });
    }
}
