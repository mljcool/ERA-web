import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { NotificationMessage } from "../models/notificationFormat.model";
import {
    AngularFirestoreCollection,
    AngularFirestore
} from "@angular/fire/firestore";
import { ICustomerNotifConfig } from "../models/customerNotifConfig.model";

@Injectable({
    providedIn: "root"
})
export class GlobalsServiceNotification {
    private API_KEY =
        "AAAAf41wBlw:APA91bE39CjrCKI4_mEE0Ymdsnz1jSWCni4eTJyKT0WP0SfHLiSfhNI0tyxq-CDWNIwzQT_DHDzikrngl7p0Z-MfM39cHix1_sOJ-HVmWOjNV3OZSKOt8xySDHamrLVnJO1JSYUGrSan";
    private STATIC_URL = "https://fcm.googleapis.com/fcm/send";

    userConfiNotifRef: AngularFirestoreCollection<ICustomerNotifConfig> = null;
    private dbPath = "/customerNotifConfig";

    constructor(private http: HttpClient, private db: AngularFirestore) {
        this.userConfiNotifRef = db.collection(this.dbPath);
    }

    public postMethod(data: NotificationMessage): Observable<any> {
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

    getUserToken(userId: string): Promise<any> {
        return this.db.firestore
            .doc(`customerNotifConfig/${userId || ""}`)
            .get();
    }

    notificationExecuter(
        userId: string
    ): Promise<{ isExists: boolean; data: any }> {
        return new Promise((resovle, reject) => {
            this.getUserToken(userId).then(userToken => {
                resovle({
                    isExists: userToken.exists,
                    data: userToken.data()
                });
            });
        });
    }
}
