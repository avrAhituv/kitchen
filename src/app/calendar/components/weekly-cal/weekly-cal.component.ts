import { Component, OnInit } from '@angular/core';
import * as Hebcal from 'hebcal';
import { DayCal } from '../../classes/day-cal';

@Component({
  selector: 'app-weekly-cal',
  templateUrl: './weekly-cal.component.html',
  styleUrls: ['./weekly-cal.component.scss']
})
export class WeeklyCalComponent implements OnInit {
  tableRows: Array<Array<DayCal>>;  

  constructor() { }

  ngOnInit() {

  }

  buildHebWeeklyCalender(){   
    
  }

}
