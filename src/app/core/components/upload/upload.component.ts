import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FileListComponent} from '../file-list/file-list.component';

@Component({
  selector: 'flox-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadComponent),
      multi: true
    }
  ]
})
export class UploadComponent implements OnInit, ControlValueAccessor {

  @Input()
  fileList: FileListComponent;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  disabled = false;

  modelValue: any;

  private multipleUp: boolean;

  onChange = (v: any) => {
  }

  onTouched = () => {
  }

  constructor() {
  }

  ngOnInit() {
    if (this.fileList) {
      this.fileList.linkInput(this);
    }
  }

  get multiple(): boolean {
    return this.multipleUp;
  }

  @Input()
  set multiple(value: boolean) {
    this.multipleUp = coerceBooleanProperty(value);
  }

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  browse() {
    this.fileInput.nativeElement.click();
  }

  selectFile(event: any) {
    const files = event.srcElement.files;

    if (this.fileList) {
      this.fileList.addFiles(files, this.multiple);
    }
    if (this.multiple) {
      this.modelValue = this.modelValue instanceof Array ? this.modelValue : [];
      let p = 0;
      while (files.length > p) {
        this.modelValue.push(files[p]);
        p++;
      }
    } else {
      this.modelValue = files[0];
    }

    this.onChange(this.modelValue);
  }

  updateSelection(files: File[]) {
    this.modelValue = files.length ? (this.multiple ? files : files[0]) : null;
    this.onChange(this.modelValue);
  }
}
