import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";
import { Orders } from "../orders.service";
import { OrderDetailService } from "./order.service";
import { orderStatuses } from "./order-statuses";
import { IAutoShopsUser } from "app/shared/models/autoShopsOwner.model";
import { ShopInfoService } from "app/main/apps/shop-information/shop-info.service";

@Component({
    selector: "e-commerce-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
    order: any = {};
    orderStatuses: any;
    statusForm: FormGroup;
    private _unsubscribeAll: Subject<any>;
    shopInformation: IAutoShopsUser;

    constructor(
        private _orderDetailsService: OrderDetailService,
        private _formBuilder: FormBuilder,
        private _ShopInfoService: ShopInfoService
    ) {
        this._ShopInfoService.getShopInformations();
        this.orderStatuses = orderStatuses;
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update order on changes
        this._ShopInfoService.onShopInfoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(myShop => {
                console.log("myShop", myShop);
                this.shopInformation = myShop;
            });

        this._orderDetailsService.onOrderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {
                this.order = order;

                console.log("olldsd", this.order);
            });

        this.statusForm = this._formBuilder.group({
            newStatus: [""]
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    updateStatus(): void {
        const newStatusId = parseInt(
            this.statusForm.get("newStatus").value,
            10
        );

        if (!newStatusId) {
            return;
        }

        const newStatus = this.orderStatuses.find(status => {
            return status.id === newStatusId;
        });

        newStatus["date"] = new Date().toString();

        this.order.status.unshift(newStatus);
    }
}
