import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { NotificationMessage } from "../models/notificationFormat.model";

@Injectable({
    providedIn: "root"
})
export class GlobalsServiceNotification {
    private API_KEY =
        "AAAAf41wBlw:APA91bE39CjrCKI4_mEE0Ymdsnz1jSWCni4eTJyKT0WP0SfHLiSfhNI0tyxq-CDWNIwzQT_DHDzikrngl7p0Z-MfM39cHix1_sOJ-HVmWOjNV3OZSKOt8xySDHamrLVnJO1JSYUGrSan";
    private STATIC_URL = "https://fcm.googleapis.com/fcm/send";

    constructor(private http: HttpClient) {}

    public postMethod(data: NotificationMessage): any {
        let headers = new HttpHeaders().set(
            "Authorization",
            `key=` + this.API_KEY
        );
        headers = headers.set("Content-Type", "application/json");
        const finalData = JSON.stringify(data);
        return this.http.post<any>(this.STATIC_URL, finalData, {
            headers: headers
        });
    }
}
