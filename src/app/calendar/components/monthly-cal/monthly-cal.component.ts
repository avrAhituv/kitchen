import { Component, OnInit ,Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import * as Hebcal from 'hebcal';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { resolve } from 'url';
import { DayCal } from '../../classes/day-cal';
import { LabelCal } from '../../classes/label-cal';
import { CalendarService } from '../../services/calendar.service';
import { Subscription } from 'rxjs';
import { Event } from '../../classes/event';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventDetailsComponent } from '../event-details/event-details.component';
// import { UserService } from '../../../user/user.service';
// import { User } from '../../../user/user.model';


@Component({
  selector: 'app-monthly-cal',
  templateUrl: './monthly-cal.component.html',
  styleUrls: ['./monthly-cal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyCalComponent implements OnInit {

  private en_months_labels:Array<string> = ['ינואר', 'פברואר', 'מרץ', 'אפריל',
  'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר',
  'אוקטובר', 'נובמבר', 'דצמבר']
  private he_months_labels:Array<string> = ['ניסן', 'אייר', 'סיון',
  'תמוז', 'אב', 'אלול','תשרי', 'חשון', 'כסלו', 'טבת',
  'שבט', 'אדר','אדר ב']
  private typeCal:number = 0 //o geo date - 1 hebrew date
  eventModal:BsModalRef
  private currDate:Date = new Date()  
  private currHdate = new Hebcal.HDate()
  private eventsCalender:Array<any>

  private hMonthNum:number
  private hYearNum:number
  private HMonth:any
  private HMonthName:string
  private HYearName:string
  private HmonthStartGreg:Date
  private HmonthEndGreg:Date

  private currLat:number
  private currLng:number 

  private month:number
  private year:number
  private startMonth:Date
  private endMonth:Date
  public tableRows:Array<Array<DayCal>> // Array<any>
  public header:string =''
  public subHeader:string = ''
  private HebCalender// = new Hebcal()//.setLocation(this.currLat, this.currLng)//.setCity('Jerusalem')  
  private heCal// = new Hebcal.GregYear(new Date().getFullYear())//.setLocation(this.currLat, this.currLng)//.setCity('Jerusalem')
  private HeMonth:any

  @Output() daySelected:EventEmitter<any>  = new EventEmitter<any>()
  public daySelect:any

  onSelected(day){    
    // this.daySelect = {}//day.getZemanim()
    // this.daySelect.dayNum = day.day
    // this.daySelect.month = day.month
    // this.daySelect.day = Hebcal.gematriya(day.day)//+' '+this.he_months_labels[day.month-1]
   
    // this.buildHebCalender()
  }

  eventsChangedSubscription:Subscription
  allEvents:Array<Event> = []
  // user:User
  isManager:boolean
  constructor(private toastr:ToastrService,private modalService: BsModalService, private cdr:ChangeDetectorRef,
    // private calendarService:CalendarService, private userService:UserService, 
     private router:Router ) {
    // this.user = this.userService.getUser()
    // this.isManager = this.userService.isManager(this.user)
    // this.calendarService.user = this.user
    // set location and date default for jerusalem
    this.currLat =31.771959
    this.currLng = 35.217018  
    this.HebCalender = new Hebcal().setLocation(this.currLat, this.currLng)
    this.heCal = new Hebcal.GregYear(new Date().getFullYear()).setLocation(this.currLat, this.currLng)
   }

  ngOnInit() {
    this.setHmonth()
    
    this.getLocation()
    .then(()=>{      
      // this.eventsChangedSubscription = this.calendarService.eventsChanged
      // .subscribe(events => {
        this.allEvents = [] // [...events] 
        this.buildHeader()
        this.buildHebCalender()  
      //  })  
       this.setHmonth() 
    })
  }

  buildHebCalender(){   
    let startDay = this.HMonth.days[0].getDay()   
    let gregDay:Date = new Date(this.HmonthStartGreg)
    let monthLength = this.HMonth.length
    
    this.tableRows = new Array<Array<DayCal>>() 
    var day = 1
    for(let i=0;i<6;i++){
      let wd = new Array<DayCal>() 
      for(let j = 0;j<=6;j++){
        if((i===0 && j < startDay) || day > monthLength){
          wd.push(new DayCal({ classes:'cal-empty-day'}))
        }else{
          let newData = new Array<LabelCal>()
          let heDate = this.HMonth.days[day-1]          
          let classes = 'cal-day'
          if(j==5){
            let candleLight = heDate.candleLighting()
            if(candleLight)
              newData.push(new LabelCal({classes:'label-times',value:'ה. נרות '+ candleLight.toLocaleTimeString()}))
          }
          if(j==6) {
            classes+=' shabat'
            newData.push(new LabelCal({classes:' label-shabat',value:heDate.getSedra('h')}))
            let havdalah = heDate.havdalah()
            if(havdalah)
              newData.push(new LabelCal({classes:'label-times',value:'צ. שבת '+havdalah.toLocaleTimeString()}))
          }
          if(this.currDate.getDate()==gregDay.getDate() && this.currDate.getMonth()== gregDay.getMonth() 
          && this.currDate.getFullYear()== gregDay.getFullYear() )
            classes+=' today'
          if(this.daySelect && this.daySelect.dayNum){
            if(this.daySelect.dayNum == day && this.daySelect.month == heDate.month)
            classes+=' select-day'
          }         
          let holidays = heDate.holidays(true)         
          if(holidays){
            for (let i = 0; i < holidays.length; i++) {
              let h = holidays[i]
              if(h.CHUL_ONLY) continue;              
              newData.push(new LabelCal({classes:'label-holiday',value:h.desc[h.desc.length-1]}))      
            }           
          }
          let data = this.allEvents.filter((e)=>{ return moment(e.start).isSameOrBefore(gregDay,'day') && moment(e.end).isSameOrAfter(gregDay,'day') }) //,'YYYY-MM-DD'
          if(data && data.length){
            data.forEach(d=>{
              newData.push(new LabelCal({classes:'label-event',value: d.summary, eventId: d.id,event:d}))
            })            
          }
          wd.push(new DayCal({classes:classes, isInMonth:true, events:newData, objHeDate:heDate,
            date: this.padDate(gregDay.getDate()),
            gregDate: new Date(gregDay), //this.padDate(gregDay.getDate())+'/'+this.padDate(gregDay.getMonth()+1),
            heDate:Hebcal.gematriya(heDate.day)})) 
            day++
            gregDay.setDate(gregDay.getDate()+1)
        }
      }
      this.tableRows.push(wd)      
      if (day > monthLength)
        break
    }
    this.cdr.detectChanges()
    // this.tableRows = this.tableRows.slice()
  }

  padDate(val:number){ 
    if(val < 10)
      return '0'+val
    else
      return ''+val
  }
nextMonth(){
  this.setHmonth(1) 
}
prevMonth(){
  this.setHmonth(-1) 
}
nextYear(){
  this.setHyear(1)
}
prevYear(){
  this.setHyear(-1)
}
setToday(){
  let htoday = this.currHdate //new Hebcal.HDate()   
  this.hMonthNum = htoday.month
  this.HMonth = new Hebcal.Month(htoday.month,htoday.year)
  this.HMonth.setLocation(this.currLat, this.currLng)
  this.HMonthName = this.HMonth.getName()
  this.hYearNum = this.HMonth.year
  this.HmonthStartGreg =this.HMonth.days[0].greg()
  this.HmonthEndGreg = this.HMonth.days[this.HMonth.length-1].greg()  
 
  this.buildPageCalendar()
}
setHyear(dir=null){
  let htoday = this.HMonth.getDay(1)
  if(dir==1){
    this.HMonth = new Hebcal.Month(htoday.month,htoday.year+1)    
  }else{
    this.HMonth = new Hebcal.Month(htoday.month,htoday.year-1)
  }
  this.HMonth.setLocation(this.currLat, this.currLng)
  this.HMonthName = this.HMonth.getName()
  this.hYearNum = this.HMonth.year
  this.HmonthStartGreg =this.HMonth.days[0].greg()
  this.HmonthEndGreg = this.HMonth.days[this.HMonth.length-1].greg() 
 
  this.buildPageCalendar()
}
setHmonth(dir=null){
  if(dir){    
    this.hMonthNum += dir
    if(dir==1)
      this.HMonth = this.HMonth.next().setLocation(this.currLat, this.currLng)//.setCity('Jerusalem')
    else
      this.HMonth = this.HMonth.prev().setLocation(this.currLat, this.currLng)//.setCity('Jerusalem')
  }else{    
    let htoday = this.currHdate //new Hebcal.HDate()   
    this.hMonthNum = htoday.month
    this.HMonth = new Hebcal.Month(htoday.month,htoday.year)
    this.HMonth.setLocation(this.currLat, this.currLng)//.setCity('Jerusalem') 
  }
  this.HMonthName = this.HMonth.getName()
  this.hYearNum = this.HMonth.year
  this.HmonthStartGreg =this.HMonth.days[0].greg()
  this.HmonthEndGreg = this.HMonth.days[this.HMonth.length-1].greg()
  this.buildPageCalendar()
}
buildPageCalendar(){
  this.buildHeader()
  this.buildHebCalender()
  // כדי לא לתקוע את היומן בעת טעינת הנתונים, אנו קודם בונים את היומן, אחר כך טוענים מהשרת את האירועים ובונים את היומן שוב
  // this.loadEvents().subscribe(() =>{   
  // },err=>{
  //   this.toastr.error('לא ניתן לטעון אירועים מהשרת!','אין חיבור לשרת :-(')
  //   this.buildHeader()
  //   this.buildHebCalender()
  // })
}
loadEvents(){
  // this.calendarService.start = this.HmonthStartGreg
  // this.calendarService.end = this.HmonthEndGreg 
  // return this.calendarService.getEventsBetweenDates()  
}
  setMonth(dir=null){
    if(dir){
      this.startMonth.setMonth(this.month + dir)
      this.hMonthNum += dir
      if(dir==1)
        this.HMonth = this.HMonth.next()
      else
        this.HMonth = this.HMonth.prev()
    }else{
      this.startMonth = new Date(this.currDate.getFullYear(),this.currDate.getMonth(),1)
      var htoday = new Hebcal.HDate()
      this.hMonthNum = htoday.month
      this.HMonth = new Hebcal.Month(htoday.month,htoday.year)
    }
    this.HMonthName = this.HMonth.getName()
    this.hYearNum = this.HMonth.year
   
    this.endMonth = new Date(this.startMonth.getFullYear(),this.startMonth.getMonth()+1,0)
    this.month = this.startMonth.getMonth()
    this.year = this.startMonth.getFullYear()
    this.HeMonth = this.heCal.months[this.month]
    this.buildHeader()
    this.buildHebCalender()
    this.eventsCalender = new Array<any>()
  }
  buildHeader(){
    //this.header= this.en_months_labels[this.month]+' '+this.year
    //Hebcal.gematriya(heDate.day)+' '+this.he_months_labels[heDate.month-1]
    let gregStartName = this.en_months_labels[this.HmonthStartGreg.getMonth()]
    let gregEndName = this.en_months_labels[this.HmonthEndGreg.getMonth()]
    let gregStartYear = this.HmonthStartGreg.getFullYear()
    let gregEndYear = this.HmonthEndGreg.getFullYear()
    this.subHeader = (gregStartYear === gregEndYear && gregStartName !== gregEndName) ? `${gregStartName} - ${gregEndName} ${gregEndYear}`: (gregStartYear !== gregEndYear && gregStartName !== gregEndName)?`${gregStartName} ${gregStartYear} - ${gregEndName} ${gregEndYear}`:`${gregStartName} ${gregStartYear}`
    this.header= this.he_months_labels[this.HMonth.month-1]+' '+Hebcal.gematriya(this.HMonth.year)
  }
  
  getLocation():Promise<any> {    
      return new Promise((resolve, reject)=>{
        if (navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition((position)=>{           
          this.currLat = position.coords.latitude
          this.currLng = position.coords.longitude         
          this.HebCalender = new Hebcal()//.setLocation(this.currLat, this.currLng)
          this.heCal = new Hebcal.GregYear(new Date().getFullYear())//.setLocation(this.currLat, this.currLng)
           resolve('success')          
        })
      } else {        
        return resolve(true)
      }      
    })
  }
  @ViewChild('userAddEventDenied',{static:false}) userAddEventDenied:TemplateRef<any>
  addEvent(cell:DayCal){    //e,
    //e.stopPropagation()
    // if(this.user)
    //   this.eventModal = this.modalService.show(EventDetailsComponent,{initialState:{day:cell,parentCalendar:this}})      //,parent:this
    // else
      this.eventModal = this.modalService.show(this.userAddEventDenied)
  }

  showEvent(event,e:LabelCal){ 
    event.stopPropagation()
    // if(!e.eventId) return
    // this.eventModal = this.modalService.show(EventDetailsComponent,{initialState:{eventId:e.eventId,parentCalendar:this}})
  }
  redirectToLogin(){
    // if(this.eventModal)
    //   this.eventModal.hide()   
    // this.userService.redirectUrl = this.router.routerState.snapshot.url
    // this.router.navigate(['/login'])
  }
  getTimeToString(e:Event){
    if(!e || !e.start) return    
    if(e.start.getHours() == 0){
      return 'כל היום'
    }
    return `${e.start.getHours()}:${this.padDate(e.start.getMinutes())}-${e.end.getHours()}:${this.padDate(e.end.getMinutes())}`
  }
}
