import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToraLessonsComponent } from './tora-lessons.component';

const routes: Routes = [
  {
    path:'',
    component: ToraLessonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToraLessonsRoutingModule { }
