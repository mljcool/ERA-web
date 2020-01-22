import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {FuseSplashScreenService} from './core/services/splash-screen.service';
import {FuseTranslationLoaderService} from './core/services/translation-loader.service';
import {FuseNavigationService} from './core/components/navigation/navigation.service';
import {FuseNavigationModel} from './navigation/navigation.model';
import {locale as navigationEnglish} from './navigation/i18n/en';
import {locale as navigationTurkish} from './navigation/i18n/tr';
import {SvgRegisterService} from './core/services/svg-register.service';

@Component({
  selector: 'flox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private fuseNavigationService: FuseNavigationService,
              private fuseSplashScreen: FuseSplashScreenService,
              private translate: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              private translationLoader: FuseTranslationLoaderService, private svgRegister: SvgRegisterService) {

    if (new RegExp('form:form\/').test(window.location.pathname)) {
      this.router.navigate(['/app', {outlets: {form: null}}]);
    }

    // Add languages
    this.translate.addLangs(['en', 'tr']);

    // Set the default language
    this.translate.setDefaultLang('en');

    // Use a language
    this.translate.use('en');

    // Set the navigation model
    this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());

    // Set the navigation translations
    this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
  }
}
