import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";

import { AcademyCoursesService } from "app/main/apps/academy/courses.service";
import { categories } from "../constants/categories";

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
    filteredCourses: any[];
    currentCategory: string;
    searchTerm: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(private _academyCoursesService: AcademyCoursesService) {
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
        this.filteredCourses = [
            {
                id: "15459251a6d6b397565",
                title: "Basics of Angular",
                slug: "basics-of-angular",
                category: "web",
                length: 30,
                updated: "Jun 28, 2017"
            },
            {
                id: "154588a0864d2881124",
                title: "Basics of TypeScript",
                slug: "basics-of-typeScript",
                category: "web",
                length: 60,
                updated: "Nov 01, 2017"
            },
            {
                id: "15453ba60d3baa5daaf",
                title: "Android N: Quick Settings",
                slug: "android-n-quick-settings",
                category: "android",
                length: 120,
                updated: "Jun 28, 2017"
            },
            {
                id: "15453a06c08fb021776",
                title: "Keep Sensitive Data Safe and Private",
                slug: "keep-sensitive-data-safe-and-private",
                category: "android",
                length: 45,
                updated: "Jun 28, 2017"
            },
            {
                id: "15427f4c1b7f3953234",
                title: "Building a gRPC Service with Java",
                slug: "building-a-grpc-service-with-java",
                category: "cloud",
                length: 30,
                updated: "Jun 28, 2017"
            },
            {
                id: "1542d75d929a603125",
                title: "Build a PWA Using Workbox",
                slug: "build-a-pwa-using-workbox",
                category: "web",
                length: 120,
                updated: "Jun 28, 2017"
            }
        ];
        // Subscribe to categories
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
     * Filter courses by category
     */
    filterCoursesByCategory(): void {
        // Filter
        if (this.currentCategory === "all") {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        } else {
            this.coursesFilteredByCategory = this.courses.filter(course => {
                return course.category === this.currentCategory;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];
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
            this.filteredCourses = this.coursesFilteredByCategory;
        } else {
            this.filteredCourses = this.coursesFilteredByCategory.filter(
                course => {
                    return course.title.toLowerCase().includes(searchTerm);
                }
            );
        }
    }
}
