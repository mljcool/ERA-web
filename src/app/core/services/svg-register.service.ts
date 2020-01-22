import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class SvgRegisterService {

  icons: Array<{ name: string, source: string }> = [];

  sourcePath = 'assets/icons/';

  extension = '.svg';

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.populateIconsSource();
    this.registerIcons();
  }

  populateIconsSource() {
    this.icons = [
      {
        name: 'blood-pressure',
        source: 'blood-pressure'
      }, {
        name: 'hearth-rate',
        source: 'hearth-rate'
      }, {
        name: 'weight',
        source: 'weight'
      }, {
        name: 'relationship',
        source: 'relationship'
      }, {
        name: 'church',
        source: 'church'
      }, {
        name: 'languages',
        source: 'languages'
      }, {
        name: 'medical-id',
        source: 'medical-id'
      }, {
        name: 'logo',
        source: 'logo'
      }, {
        name: 'male',
        source: 'male'
      }, {
        name: 'female',
        source: 'female'
      }
    ];
  }

  registerIcons() {
    for (const icon of this.icons) {
      this.iconRegistry.addSvgIcon(icon.name, this.generateUrl(icon.source));
    }
  }

  private generateUrl(fileName: string) {
    const path = `${this.sourcePath}${fileName}${this.extension}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }
}
