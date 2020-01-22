import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../core/modules/shared.module';

import {FuseMainComponent} from './main.component';
import {FuseNavigationModule} from '../core/components/navigation/navigation.module';
import {FuseShortcutsModule} from '../core/components/shortcuts/shortcuts.module';
import {FuseSearchBarModule} from '../core/components/search-bar/search-bar.module';
import {FuseContentComponent} from './components/content/content.component';
import {FuseNavbarVerticalComponent} from './components/navbar/vertical/navbar-vertical.component';
import {FuseNavbarHorizontalComponent} from './components/navbar/horizontal/navbar-horizontal.component';
import {FuseToolbarComponent} from './components/toolbar/toolbar.component';
import {FuseNavbarVerticalToggleDirective} from './components/navbar/vertical/navbar-vertical-toggle.directive';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';

@NgModule({
  declarations: [
    FuseContentComponent,
    FuseMainComponent,
    FuseNavbarVerticalComponent,
    FuseNavbarHorizontalComponent,
    FuseToolbarComponent,
    FuseNavbarVerticalToggleDirective,
    FormLayoutComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    FuseNavigationModule,
    FuseShortcutsModule,
    FuseSearchBarModule
  ],
  exports: [
    FuseMainComponent,
    FormLayoutComponent
  ]
})

export class FuseMainModule {
}
