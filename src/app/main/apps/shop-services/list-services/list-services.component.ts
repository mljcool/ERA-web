import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";

import { categories } from "../constants/categories";
import { AcademyCoursesService } from "../courses.service";
import { MatDialog } from "@angular/material";
import { AddServicesComponent } from "../modals/add-services/add-services.component";
import { FormGroup } from "@angular/forms";
import { MyListShopServices } from "./list-services.service";
import { IServicesModel } from "../models/services.model";
import { MechanicModels } from "../mechanics/mechanics.model";

@Component({
    selector: "academy-courses",
    templateUrl: "./list-services.component.html",
    styleUrls: ["./list-services.component.scss"],
    animations: fuseAnimations
})
export class ListOfServicesComponent implements OnInit, OnDestroy {
    categories: any[];
    courses: any[];
    coursesFilteredByCategory: any[];
    filteredServices: IServicesModel[];
    allMechanics: MechanicModels[];
    currentCategory: string;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: AcademyCoursesService,
        private _MyListShopServices: MyListShopServices,
        public dialog: MatDialog
    ) {
        // Set the defaults
        this.currentCategory = "all";
        this.searchTerm = "";

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
        this.categories = categories;
        this._MyListShopServices.onListServicesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(listOfdata => {
                this.filteredServices = listOfdata;
            });

        this._MyListShopServices.onMechanicChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(mechaniclist => {
                this.allMechanics = mechaniclist;
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

    getMechanicsByName(id: any): string {
        const name = this.allMechanics.find(cat => cat.id === id).name;
        return name;
    }

    getCategoryByName(id: number): string {
        const name = this.categories.find(cat => cat.value === id).name;
        return name;
    }

    /**
     * Filter courses by category
     */
    filterCoursesByCategory(): void {
        // Filter
        if (this.currentCategory === "all") {
            this.coursesFilteredByCategory = this.courses;
            this.filteredServices = this.courses;
        } else {
            this.coursesFilteredByCategory = this.courses.filter(course => {
                return course.category === this.currentCategory;
            });

            this.filteredServices = [...this.coursesFilteredByCategory];
        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterCoursesByTerm(): void {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if (searchTerm === "") {
            this.filteredServices = this.coursesFilteredByCategory;
        } else {
            this.filteredServices = this.coursesFilteredByCategory.filter(
                course => {
                    return course.title.toLowerCase().includes(searchTerm);
                }
            );
        }
    }

    addServices(): void {
        const dialog = this.dialog.open(AddServicesComponent, {
            panelClass: "add-services-form-dialog",
            data: {
                action: "new"
            }
        });
        dialog.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            }
        });
    }
}
