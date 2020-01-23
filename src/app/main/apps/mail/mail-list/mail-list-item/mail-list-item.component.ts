import {
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Mail } from "app/main/apps/mail/mail.model";
import { MailService } from "app/main/apps/mail/mail.service";

@Component({
    selector: "mail-list-item",
    templateUrl: "./mail-list-item.component.html",
    styleUrls: ["./mail-list-item.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MailListItemComponent implements OnInit, OnDestroy {
    @Input() mail: Mail;
    labels: any[];

    @HostBinding("class.selected")
    selected: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MailService} _reviewService
     */
    constructor(private _reviewService: MailService) {
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
        // Set the initial values
        this.mail = new Mail(this.mail);

        // Subscribe to update on selected mail change
        this._reviewService.onSelectedMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedReview => {
                this.selected = false;

                if (selectedReview.length > 0) {
                    for (const mail of selectedReview) {
                        if (mail.id === this.mail.id) {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });

        // Subscribe to update on label change
        this._reviewService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
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
     * On selected change
     */
    onSelectedChange(): void {
        this._reviewService.toggleSelectedMail(this.mail.id);
    }

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void {
        event.stopPropagation();

        this.mail.toggleStar();

        this._reviewService.updateMail(this.mail);
    }

    /**
     * Toggle Important
     *
     * @param event
     */
    toggleImportant(event): void {
        event.stopPropagation();

        this.mail.toggleImportant();

        this._reviewService.updateMail(this.mail);
    }
}
