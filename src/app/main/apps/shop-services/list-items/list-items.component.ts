import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import { MatPaginator, MatSort, MatDialog } from "@angular/material";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";
import { FuseUtils } from "@fuse/utils";

import { takeUntil } from "rxjs/internal/operators";
import { ShopProductsService } from "./list-items.service";
import { AddProductComponent } from "../modals/add-product/add-product.component";
import { FormGroup } from "@angular/forms";
import { GetUserDataService } from "app/shared/services/getUserData.service";
import Swal from "sweetalert2";

@Component({
    selector: "list-items",
    templateUrl: "./list-items.component.html",
    styleUrls: ["./list-items.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ListItemsComponent implements OnInit {
    dataSource: FilesDataSource | null;
    displayedColumns = [
        "id",
        "name",
        "category",
        "price",
        "quantity",
        "active"
    ];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild("filter")
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _ecommerceProductsService: ShopProductsService,
        public dialog: MatDialog,
        private _GetUserDataService: GetUserDataService
    ) {
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
        this.dataSource = new FilesDataSource(
            this._ecommerceProductsService,
            this.paginator,
            this.sort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    addNewProducts(): void {
        const dialog = this.dialog.open(AddProductComponent, {
            panelClass: "product-form-dialog",
            data: {
                action: "new"
            }
        });
        dialog.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
            this._GetUserDataService.onUserChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(userData => {
                    const prodData = {
                        uid: userData.uid,
                        ...response.getRawValue()
                    };

                    this._ecommerceProductsService
                        .addNewProducts(prodData)
                        .then(isSaved => {
                            console.log("isSaved", isSaved);
                            if (isSaved) {
                                Swal.fire(
                                    "Success!",
                                    "Item Added successfully!",
                                    "success"
                                );
                            }
                        });
                });
        });
    }
}

export class FilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    /**
     * Constructor
     *
     * @param {EcommerceProductsService} _ecommerceProductsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _ecommerceProductsService: ShopProductsService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();

        this.filteredData = this._ecommerceProductsService.products;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._ecommerceProductsService.onProductsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this._ecommerceProductsService.products.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex =
                    this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === "") {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matSort.active) {
                case "id":
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case "name":
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case "categories":
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case "price":
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case "quantity":
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case "active":
                    [propertyA, propertyB] = [a.active, b.active];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {}
}
