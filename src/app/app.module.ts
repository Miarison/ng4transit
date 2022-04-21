import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns'; 
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { MaterialModule } from './component/material/material.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { WorkOrderComponent } from './work-order/work-order.component';
import { LogoutComponent } from './component/logout/logout.component';
import { TimeSheetComponent } from './component/time-sheet/time-sheet.component';
import { ClockTimeComponent } from './component/clock-time/clock-time.component';
import { ClockTimeDetailsComponent } from './component/clock-time-details/clock-time-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    LoginComponent,
    LayoutComponent,
    WorkOrderComponent,
    LogoutComponent,
    TimeSheetComponent,
    ClockTimeComponent,
    ClockTimeDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScheduleModule,
    DropDownListModule,
    DateTimePickerModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
