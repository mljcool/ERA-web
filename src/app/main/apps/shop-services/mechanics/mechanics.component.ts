import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { ContactsService } from "./mechanics.service";
import { MechanicFormDialogComponent } from "./mechanics-form/mechanic-form.component";
import Swal from "sweetalert2";

@Component({
    selector: "my-mechanics",
    templateUrl: "./mechanics.component.html",
    styleUrls: ["./mechanics.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MyMechanicComponent implements OnInit, OnDestroy {
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _mechanicService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _mechanicService: ContactsService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog
    ) {
        // Set the defaults
        this.searchInput = new FormControl("");

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._mechanicService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
                this.hasSelectedContacts = selectedContacts.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._mechanicService.onSearchTextChanged.next(searchText);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New contact
     */
    newMechanic(): void {
        this.dialogRef = this._matDialog.open(MechanicFormDialogComponent, {
            panelClass: "mechanic-form-dialog",
            data: {
                action: "new"
            }
        });

        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }

            this._mechanicService
                .addNewMechanic(response.getRawValue())
                .then(isSaved => {
                    if (isSaved) {
                        Swal.fire(
                            "Success!",
                            "Mechanic Added successfully!",
                            "success"
                        );
                    }
                });
        });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
