import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective} from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.directive';
import {FuseMatSidenavHelperService} from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';
import {FusePipesModule} from '../pipes/pipes.module';
import {FuseConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';
import {FuseMatchMedia} from '../services/match-media.service';
import {FusePerfectScrollbarDirective} from '../directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseTranslationLoaderService} from '../services/translation-loader.service';
import {CookieService} from 'ngx-cookie-service';
import {TranslateModule} from '@ngx-translate/core';
import {FuseNavbarVerticalService} from '../../main/components/navbar/vertical/navbar-vertical.service';
import {FileListComponent} from '../components/file-list/file-list.component';
import {UploadComponent} from '../components/upload/upload.component';

@NgModule({
  declarations: [
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FuseConfirmDialogComponent,
    FusePerfectScrollbarDirective,
    FileListComponent,
    UploadComponent,
  ],
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FusePipesModule,
    ReactiveFormsModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    FuseMatSidenavHelperDirective,
    FuseMatSidenavTogglerDirective,
    FusePipesModule,
    FusePerfectScrollbarDirective,
    ReactiveFormsModule,
    TranslateModule,
    FuseConfirmDialogComponent,
    UploadComponent,
    FileListComponent
  ],
  entryComponents: [
    FuseConfirmDialogComponent
  ],
  providers: [
    CookieService,
    FuseMatchMedia,
    FuseNavbarVerticalService,
    FuseMatSidenavHelperService,
    FuseTranslationLoaderService
  ]
})

export class SharedModule {

}
