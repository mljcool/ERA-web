import {Injector} from '@angular/core';
import {Router} from '@angular/router';
import {FormContentService} from './services/form-content.service';

export abstract class BaseForm {

  private _router: Router;

  private _formContentService: FormContentService;

  constructor(private injector: Injector) {
    this._router = injector.get(Router);
    this._formContentService = injector.get(FormContentService);
    this.onInit();
  }

  protected onInit() {
    this._formContentService.show();
  }

  close() {
    this._formContentService.close().then(() => {
      this._router.navigate(['/app', {outlets: {form: null}}]);
    });
  }
}
