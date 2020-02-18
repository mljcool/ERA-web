import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08",
            libraries: ["places"]
        }),
        AgmDirectionModule
    ],
    exports: [AgmDirectionModule, AgmCoreModule]
})
export class AgmMapModule {}
