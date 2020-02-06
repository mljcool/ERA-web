import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-registered",
    templateUrl: "./registered.component.html",
    styleUrls: ["./registered.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisteredComponent implements OnInit {
    @Input() shopData: any;
    constructor() {}

    ngOnInit(): void {}

    checkObjectEmpty(objectData: object): boolean {
        return Object.entries(objectData).length === 0;
    }
}
