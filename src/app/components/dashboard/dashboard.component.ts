import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { map, window } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { faPizzaSlice, faTorah, faAddressBook, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'מתכונים', cols: 1, rows: 1, link: 'recipes', icon: faPizzaSlice },
          { title: 'אנשי קשר', cols: 1, rows: 1, link: 'contacts', icon: faAddressBook },
          { title: 'לוח שנה', cols: 1, rows: 1, link: 'calendar', icon: faCalendarAlt },
          // { title: 'רשימת קניות', cols: 1, rows: 1, link:'',content:'מוצרים אחרונים' },
          // { title: 'מוזיקה', cols: 1, rows: 1, link:'music' },
          { title: 'שיעורי תורה', cols: 1, rows: 1, link: 'lessons', icon: faTorah }
        ];
      }

      return [
        { title: 'מתכונים', cols: 1, rows: 1, link: 'recipes', icon: faPizzaSlice },
        { title: 'אנשי קשר', cols: 1, rows: 1, link: 'contacts', icon: faAddressBook },
        { title: 'לוח שנה', cols: 1, rows: 1, link: 'calendar', icon: faCalendarAlt },
        // { title: 'רשימת קניות', cols: 1, rows: 1, link:'',content:'מוצרים אחרונים' },
        // { title: 'מוזיקה', cols: 1, rows: 1, link:'music' },
        { title: 'שיעורי תורה', cols: 1, rows: 1, link: 'lessons', icon: faTorah }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {

  }
  
}
