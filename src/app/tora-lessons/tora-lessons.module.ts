import { NgModule } from '@angular/core';
import { ToraLessonsComponent } from './tora-lessons.component';
import { ToraLessonsRoutingModule } from './tora-lessons-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ToraLessonsComponent],
  imports: [
    SharedModule,
    ToraLessonsRoutingModule
  ],
  // providers:[{provide:IGoogleSearchService, useClass:CustomGoogleSearchService}]
})
export class ToraLessonsModule { }
