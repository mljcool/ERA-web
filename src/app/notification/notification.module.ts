import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { NotificationListComponent } from './components/notification-list/notification-list.component';
import {SharedModule} from '../core/modules/shared.module';
import {routes} from './notification.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotificationListComponent]
})
export class NotificationModule { }
