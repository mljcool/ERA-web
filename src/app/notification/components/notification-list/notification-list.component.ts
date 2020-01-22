import {Component, Injector, OnInit} from '@angular/core';
import {BaseForm} from '../../../core/base-form';
import {FormValidatorService} from '../../../core/services/form-validator.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'flox-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent extends BaseForm implements OnInit {

  notifications = [
    {
      type: 'alert',
      icon: 'error',
      message: 'You have 5 unassign cases.',
      caseId: null
    },
    {
      type: 'warning',
      icon: 'access_time',
      message: 'You need to check Jhon Doe case',
      caseId: '1'
    },
    {
      type: 'information',
      icon: 'notifications_active',
      message: 'Elizabeth T. McInnis has an appointment with you today.',
      caseId: '5'
    },
    {
      type: 'warning',
      icon: 'folder_shared',
      message: 'Ronald A. Darlington has an appointment with you today.',
      caseId: 6
    }
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
