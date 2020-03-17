import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule, MonthPickerComponent } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalendarModule as DateTimePickerModule } from 'primeng/calendar';

import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MonthlyCalComponent } from './components/monthly-cal/monthly-cal.component';
import { WeeklyCalComponent } from './components/weekly-cal/weekly-cal.component';
import { CalendarComponent } from './calendar.component';
// import { UserService } from '../user/user.service';

// import { UserModule } from '../user/user.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CalendarRoutingModule } from './calendar-routing.module';
// import { JwtInterceptor } from '../user/jwt-Interceptor';

@NgModule({
  declarations: [
    MonthlyCalComponent,
    WeeklyCalComponent,
    CalendarComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DateTimePickerModule,
    CalendarRoutingModule
    //,UserModule
  ],
  // providers:[
  //   { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  // ],
  exports: [
    MonthlyCalComponent
  ],
  entryComponents: [EventDetailsComponent]
})
export class CalendarModule { }
