import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './component/account/account.component';
import { ClockTimeComponent } from './component/clock-time/clock-time.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmailComponent } from './component/email/email.component';
import { InformationComponent } from './component/information/information.component';
import { LayoutComponent } from './component/layout/layout.component';
import { LogoutComponent } from './component/logout/logout.component';
import { MessageComponent } from './component/message/message.component';
import { PayrollComponent } from './component/payroll/payroll.component';
import { PerformanceComponent } from './component/performance/performance.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { TimeSheetComponent } from './component/time-sheet/time-sheet.component';
import { WorkHistoryComponent } from './component/work-history/work-history.component';
import { AuthGuard } from './guards/auth.guard';
import { WorkOrderComponent } from './work-order/work-order.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '', component: ScheduleComponent
      },
      {
        path: 'schedules', component: ScheduleComponent, canActivate: [AuthGuard]
      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
      },
      {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: 'timeSheets', component: TimeSheetComponent, canActivate: [AuthGuard]
      },
      {
        path: 'clockTime', component: ClockTimeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'information', component: InformationComponent, canActivate: [AuthGuard]
      },
      {
        path: 'workHistory', component: WorkHistoryComponent, canActivate: [AuthGuard]
      },
      {
        path: 'workOrder', component: WorkOrderComponent, canActivate: [AuthGuard]
      },
      {
        path: 'performance', component: PerformanceComponent, canActivate: [AuthGuard]
      },
      {
        path: 'email', component: EmailComponent, canActivate: [AuthGuard]
      },
      {
        path: 'message', component: MessageComponent, canActivate: [AuthGuard]
      },
      {
        path: 'account', component: AccountComponent, canActivate: [AuthGuard]
      },
      {
        path: 'payroll', component: PayrollComponent, canActivate: [AuthGuard]
      },
      {
        path: 'register', component: RegistrationComponent, canActivate: [AuthGuard]
      },
      {
        path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
