import {Routes} from '@angular/router';
import {FuseMainComponent} from './main/main.component';
import {FormLayoutComponent} from './main/components/form-layout/form-layout.component';
import {NotificationModule} from './notification/notification.module';

export const routes: Routes = [
  {
    path: 'app',
    component: FuseMainComponent,
    children: []
  },
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: '**', redirectTo: 'app'}
];
