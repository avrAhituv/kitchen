import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthlyCalComponent } from './components/monthly-cal/monthly-cal.component';

const routes: Routes = [
  {
    path: '',
    component:MonthlyCalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }