import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Injectable()
export class FormContentService {

  wizardContainer: MatSidenav;

  constructor() {
  }

  show() {
    return this.wizardContainer.open();
  }

  close() {
    return this.wizardContainer.close();
  }

}
