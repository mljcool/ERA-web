import {AfterViewInit, Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FuseConfigService} from '../core/services/config.service';
import {Platform} from '@angular/cdk/platform';
import {DOCUMENT} from '@angular/common';
import {MatSidenav} from '@angular/material';
import {FormContentService} from '../core/services/form-content.service';
import {Router} from '@angular/router';

@Component({
  selector: 'flox-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FuseMainComponent implements OnInit, AfterViewInit, OnDestroy {
  onSettingsChanged: Subscription;
  fuseSettings: any;
  @HostBinding('attr.fuse-layout-mode') layoutMode;

  @ViewChild(MatSidenav)
  private _sideNave: MatSidenav;

  constructor(private _renderer: Renderer2,
              private _elementRef: ElementRef,
              private fuseConfig: FuseConfigService,
              private platform: Platform,
              private router: Router,
              private formContent: FormContentService,
              @Inject(DOCUMENT) private document: any) {
    this.onSettingsChanged =
      this.fuseConfig.onSettingsChanged
        .subscribe(
          (newSettings) => {
            this.fuseSettings = newSettings;
            this.layoutMode = this.fuseSettings.layout.mode;
          }
        );

    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.className += ' is-mobile';
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.formContent.wizardContainer = this._sideNave;
  }

  ngOnDestroy() {
    this.onSettingsChanged.unsubscribe();
  }

  addClass(className: string) {
    this._renderer.addClass(this._elementRef.nativeElement, className);
  }

  removeClass(className: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, className);
  }

  displayQuickCase() {
    this.router.navigate(['/app', {outlets: {form: 'form/cases/quick'}}]);
  }

  displayQuickTask() {
    this.router.navigate(['/app', {outlets: {form: 'form/task/quick'}}]);
  }

  displayQuickPatient() {
    this.router.navigate(['/app', {outlets: {form: 'form/patients/new'}}]);
  }

}
