import {Component} from '@angular/core';
import {UploadComponent} from '../upload/upload.component';

@Component({
  selector: 'flox-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent {

  fileList: File[] = [];

  private uploadInput: UploadComponent;

  constructor() {
  }

  linkInput(input: UploadComponent) {
    this.uploadInput = input;
  }

  addFile(file: File, multipe = false) {
    const index = this.fileList.indexOf(file);
    if (index === -1) {
      this.fileList.push(file);
    }
  }

  addFiles(files: FileList, multiple = false) {
    if (!multiple) {
      this.fileList = [];
    }
    let p = 0;
    while (files.length > p) {
      this.addFile(files[p], multiple);
      p++;
    }
  }

  removeFile(file: File) {
    const index = this.fileList.indexOf(file);
    if (index >= 0) {
      this.removeByPos(index);
    }
  }

  removeByPos(index: number) {
    this.fileList.splice(index, 1);
    if (this.uploadInput) {
      this.uploadInput.updateSelection(this.fileList);
    }
  }
}

