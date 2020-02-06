import { Component, OnInit } from "@angular/core";
import { ShopInfoService } from "./shop-info.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IAutoShopsUser } from "app/shared/models/autoShopsOwner.model";

@Component({
    selector: "shop-information",
    templateUrl: "./shop-information.component.html",
    styleUrls: ["./shop-information.component.scss"]
})
export class ShopInformationComponent implements OnInit {
    private _unsubscribeAll: Subject<any>;
    shopInformation: IAutoShopsUser;

    constructor(private _ShopInfoService: ShopInfoService) {
        this._ShopInfoService.getShopInformations();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._ShopInfoService.onShopInfoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(myShop => {
                console.log("myShop", myShop);
                this.shopInformation = myShop;
            });
    }
}
