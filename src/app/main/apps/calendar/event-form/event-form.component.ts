import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CalendarEvent } from "angular-calendar";

import { MatColors } from "@fuse/mat-colors";

import * as _moment from "moment";
import Swal from "sweetalert2";
import { CalendarEventModel } from "app/main/apps/calendar/event.model";
import { CalendarService } from "../calendar.service";
import { GlobalsServiceNotification } from "app/shared/services/post-notification.service";

@Component({
    selector: "calendar-event-form-dialog",
    templateUrl: "./event-form.component.html",
    styleUrls: ["./event-form.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class CalendarEventFormDialogComponent {
    action: string;
    event: CalendarEvent | any = {};
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private calServc: CalendarService,
        private _globalNotif: GlobalsServiceNotification
    ) {
        this.event = _data.event;
        this.action = _data.action;
        console.log("matDialogRef", this.event);
        if (this.action === "edit") {
            this.dialogTitle = this.event.title;
        } else {
            this.dialogTitle = "New Event";
            this.event = new CalendarEventModel({
                start: _data.date,
                end: _data.date
            });
        }

        this.eventForm = this.createEventForm();
    }

    onSubmit(type: string, messageText: string): void {
        this.calServc.onAcceptOrDecline(this.event, type).then(response => {
            Swal.fire(
                type,
                "This customer will receive a notification",
                "success"
            );

            const userId = this.event.extraData.customerData.id;
            const refId = this.event.extraData.referenceId;
            const textMessage = this.event.disposableData.name;

            this._globalNotif
                .notificationExecuter(userId)
                .then(({ isExists, data }) => {
                    const token = data.token;

                    if (isExists) {
                        this._globalNotif
                            .postMethod({
                                to: token,
                                priority: "high",
                                notification: {
                                    title: "Booking Got " + messageText,
                                    text: textMessage
                                },
                                data: {
                                    extra_information:
                                        "your schedule for this services got " +
                                        textMessage +
                                        messageText,
                                    refIds: refId,
                                    myId: userId,
                                    typeRoute: "my-bookings"
                                }
                            })
                            .subscribe(dataNotif => {
                                console.log("notification", dataNotif);
                            });
                    }
                });

            this.matDialogRef.close();
        });
    }

    createEventForm(): FormGroup {
        return new FormGroup({
            title: new FormControl({
                value: this.event.disposableData.name,
                disabled: true
            }),
            start: new FormControl({
                value: this.event.start,
                disabled: true
            }),
            end: new FormControl({
                value: this.event.end,
                disabled: true
            }),
            customerName: new FormControl({
                value: this.event.extraData.customerData.name,
                disabled: true
            }),
            timeArrival: new FormControl({
                value: _moment(this.event.disposableData.time).format(
                    "hh:mm:ss A"
                ),
                disabled: true
            }),
            contactInfo: new FormControl({
                value: this.event.disposableData.contact,
                disabled: true
            }),
            allDay: new FormControl({
                value: this.event.allDay,
                disabled: true
            }),
            color: this._formBuilder.group({
                primary: new FormControl({
                    value: this.event.color.primary,
                    disabled: true
                }),
                secondary: new FormControl({
                    value: this.event.color.secondary,
                    disabled: true
                })
            }),
            meta: this._formBuilder.group({
                location: new FormControl({
                    value: this.event.meta.location,
                    disabled: true
                }),
                notes: new FormControl({
                    value: this.event.meta.notes,
                    disabled: true
                })
            })
        });
    }
}
