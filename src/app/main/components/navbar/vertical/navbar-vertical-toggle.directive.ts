import {Directive, HostListener, Input} from '@angular/core';
import {FuseNavbarVerticalService} from './navbar-vertical.service';
import {FuseNavbarVerticalComponent} from './navbar-vertical.component';

@Directive({
  selector: '[floxNavbarVertical]'
})
export class FuseNavbarVerticalToggleDirective {
  @Input() floxNavbarVertical: string;
  navbar: FuseNavbarVerticalComponent;

  constructor(private navbarService: FuseNavbarVerticalService) {
  }

  @HostListener('click')
  onClick() {
    this.navbar = this.navbarService.getNavBar();

    if (!this.navbar[this.floxNavbarVertical]) {
      return;
    }

    this.navbar[this.floxNavbarVertical]();
  }
}
