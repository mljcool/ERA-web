import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    NgZone
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MapsAPILoader, MouseEvent } from "@agm/core";

@Component({
    selector: "app-first-visit",
    templateUrl: "./first-visit.component.html",
    styleUrls: ["./first-visit.component.scss"]
})
export class FirstVisitComponent implements OnInit {
    form: FormGroup;

    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;

    // googleMaps SETUPS
    @ViewChild("search")
    public searchElementRef: ElementRef;

    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    private geoCoder;

    constructor(
        private _formBuilder: FormBuilder,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngOnInit(): void {
        this.setCurrentLocation();
        this.mapsAPILoader.load().then(() => {
            this.setCurrentLocation();
            this.geoCoder = new google.maps.Geocoder();

            const autocomplete = new google.maps.places.Autocomplete(
                this.searchElementRef.nativeElement,
                {
                    types: ["address"]
                }
            );
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (
                        place.geometry === undefined ||
                        place.geometry === null
                    ) {
                        return;
                    }

                    // set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    console.log("lat", this.latitude);
                    console.log("long", this.longitude);
                    this.zoom = 15;
                });
            });
        });

        // form Builder for steppers
        this.verticalStepperStep1 = this._formBuilder.group({
            mainName: ["", Validators.required],
            secondaryName: [""]
        });

        this.verticalStepperStep2 = this._formBuilder.group({
            contactOne: [
                "",
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(10)
                ])
            ],
            contactTwo: [""],
            contactEmait: ["", [Validators.required, Validators.email]]
        });

        this.verticalStepperStep3 = this._formBuilder.group({
            writtenAddress: ["", Validators.required],
            latitude: [""],
            longitude: [""]
        });
    }

    // Get Current Location Coordinates
    private setCurrentLocation(): void {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 8;
                this.getAddress(this.latitude, this.longitude);
            });
        }
    }

    getAddress(latitude: number, longitude: number): void {
        this.geoCoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
                console.log(results);
                console.log(status);
                if (status === "OK") {
                    if (results[0]) {
                        this.zoom = 12;
                        this.address = results[0].formatted_address;
                    } else {
                        window.alert("No results found");
                    }
                } else {
                    window.alert("Geocoder failed due to: " + status);
                }
            }
        );
    }

    markerDragEnd($event: MouseEvent): void {
        console.log($event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress(this.latitude, this.longitude);
    }

    finishVerticalStepper(): void {
        alert("You have finished the vertical stepper!");
    }
}
