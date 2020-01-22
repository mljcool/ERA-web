import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import * as _ from 'lodash';

type Form = NgForm
  | FormGroup
  | FormArray
  | FormGroupDirective;

@Injectable()
export class FormValidatorService {

  validate(form: Form): boolean {
    const controls = this.getControls(form);
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        const ctrl = controls[key];
        if (ctrl instanceof FormGroup || ctrl instanceof FormArray) {
          this.validate(ctrl);
        }
        if (ctrl instanceof AbstractControl) {
          ctrl.markAsDirty();
          ctrl.markAsTouched();
          ctrl.updateValueAndValidity();
        }
      }
    }

    return form.valid;
  }

  clearValidationMessages(form: Form) {
    const controls: any = this.getControls(form);
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        const ctrl = controls[key];
        if (ctrl instanceof FormGroup || ctrl instanceof FormArray) {
          this.clearValidationMessages(ctrl);
        }
        if (ctrl instanceof AbstractControl) {
          ctrl.updateValueAndValidity();
          ctrl.setErrors(null, {emitEvent: true});
        }
      }
    }
  }

  setValidationMessages(msgs: any, form: Form) {
    const control: FormGroup | FormArray = (form instanceof FormGroupDirective || form instanceof NgForm) ? form.control : form;
    for (const key in msgs) {
      if (msgs.hasOwnProperty(key)) {
        const errors = msgs[key];
        const ctrl = control.get('' + key);
        if (ctrl) {
          if (ctrl instanceof FormGroup || ctrl instanceof FormArray) {
            this.setValidationMessages(errors, ctrl);
          } else if (ctrl instanceof AbstractControl) {
            this.setControlErrors(ctrl, errors);
          }
        }
      }
    }
  }

  setAPIValidationMessages(errors: any[], form: FormGroup | FormArray, ignoreSuffix: number = 0) {
    const errorsObject: any = {};
    for (const path in errors) {
      if (errors.hasOwnProperty(path)) {
        const arrayPath: string[] = _.toPath(path);
        for (let i = 0; i < ignoreSuffix; i++) {
          arrayPath.shift();
        }
        const errorValue = errors[path];
        let control: any = form.get(arrayPath);
        if (control instanceof AbstractControl) {
          this.setControlErrors(control, errorValue);
        } else {
          let found = false;
          while (!found && arrayPath.length) {
            arrayPath.pop();
            control = form.get(arrayPath);
            if (control instanceof AbstractControl) {
              this.setControlErrors(control, errorValue);
              found = true;
            }
          }
        }
      }
    }
    return errorsObject;
  }

  parseErrors(errors: any[], formValue: any) {
    const errorsObject: any = {};
    for (const path in errors) {
      if (errors.hasOwnProperty(path)) {
        const arrayPath: string[] = _.toPath(path);
        const value = errors[path];
        if (_.has(formValue, arrayPath)) {
          _.set(errorsObject, arrayPath, value);
        } else {
          let found = false;
          while (!found && arrayPath.length) {
            arrayPath.pop();
            if (_.has(formValue, arrayPath)) {
              _.set(errorsObject, arrayPath, value);
              found = true;
            }
          }
        }
      }
    }
    return errorsObject;
  }

  private setControlErrors(ctrl: AbstractControl, errors: any) {
    const error: Object = {};
    if (typeof errors === 'string') {
      error[errors] = true;
    } else if (typeof errors === 'object') {
      for (const errKey in errors) {
        if (errors.hasOwnProperty(errKey)) {
          error[errKey] = errors[errKey] || true;
        }
      }
    }
    ctrl.markAsDirty({
      onlySelf: false
    });
    ctrl.markAsTouched({
      onlySelf: false
    });
    ctrl.setErrors(error, {emitEvent: true});
  }

  private getControls(form: Form): any {
    if (form instanceof FormGroupDirective || form instanceof NgForm) {
      return form.control.controls;
    }
    return form.controls;
  }

}
