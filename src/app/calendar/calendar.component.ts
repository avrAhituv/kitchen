import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currLat:number;
  currLng:number;
  isLoaded = false;

  constructor() { }

  ngOnInit() {
    this.getLocation()
    .then(()=>{
      this.isLoaded = true;
    })
  }

  getLocation():Promise<any> {    
    return new Promise((resolve, reject)=>{
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position)=>{           
        this.currLat = position.coords.latitude
        this.currLng = position.coords.longitude         
        // this.HebCalender = new Hebcal()//.setLocation(this.currLat, this.currLng)
        // this.heCal = new Hebcal.GregYear(new Date().getFullYear())//.setLocation(this.currLat, this.currLng)
         resolve(true)          
      })
    } else {
      this.currLat =31.771959
      this.currLng = 35.217018  
      // this.HebCalender = new Hebcal().setLocation(this.currLat, this.currLng)
      // this.heCal = new Hebcal.GregYear(new Date().getFullYear()).setLocation(this.currLat, this.currLng)
      return resolve(true)
    }      
  })
}

}
