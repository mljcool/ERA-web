import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import {
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule
} from "@angular/material";

import { FuseSharedModule } from "@fuse/shared.module";

import { ListOfServicesComponent } from "app/main/apps/shop-services/list-services/list-services.component";
import { AcademyCoursesService } from "app/main/apps/academy/courses.service";
import { AcademyCourseService } from "app/main/apps/academy/course.service";
import { FuseSidebarModule } from "@fuse/components";
import { ListItemsComponent } from "./list-items/list-items.component";
import { ShopProductsService } from "./list-items/list-items.service";

const routes = [
    {
        path: "list-services",
        component: ListOfServicesComponent
    },
    {
        path: "list-items",
        component: ListItemsComponent,
        resolve: {
            data: ShopProductsService
        }
    }
];

@NgModule({
    declarations: [ListOfServicesComponent, ListItemsComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers: [AcademyCoursesService, ShopProductsService]
})
export class ShopServicesModule {}
