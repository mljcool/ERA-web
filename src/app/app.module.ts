import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';
import {routes} from './app.routes';
import {AppComponent} from './app.component';
import {SharedModule} from './core/modules/shared.module';
import {FuseMainModule} from './main/main.module';
import {FuseSplashScreenService} from './core/services/splash-screen.service';
import {FuseConfigService} from './core/services/config.service';
import {FuseNavigationService} from './core/components/navigation/navigation.service';
import {FormContentService} from './core/services/form-content.service';
import {FormValidatorService} from './core/services/form-validator.service';
import {SvgRegisterService} from './core/services/svg-register.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    TranslateModule.forRoot(),
    FuseMainModule
  ],
  providers: [
    FuseSplashScreenService,
    FuseConfigService,
    FuseNavigationService,
    FormContentService,
    FormValidatorService,
    SvgRegisterService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
