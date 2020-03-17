import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Event } from '../../classes/event';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DayCal } from '../../classes/day-cal';
// import { User } from '../../../user/user.model';
// import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  // hePrimeCal:any

  // private _eventId:number;
  // get eventId():number{
  //   return this._eventId ? this._eventId : 0;
  // }
  // @Input() set eventId(val:number){
  //   if(val == 0) return;
  //   this._eventId = val;
  //   this.calService.getEventById(this.eventId).subscribe(e=>{      
  //     this.currEvent = e
  //     let startTime = -1
  //     let endTime = -1
  //     if(e.start.getHours() || e.start.getMinutes()){
  //       startTime = e.start.getHours()
  //       if(e.start.getMinutes())
  //         startTime += 0.5
  //     }
  //     if(e.end.getHours() || e.end.getMinutes()){
  //       endTime = e.end.getHours()
  //       if(e.end.getMinutes())
  //         startTime += 0.5
  //     }
  //     this.form =  this.fb.group({
  //       id: [this.currEvent.id],
  //       summary: [this.currEvent.summary, [Validators.required, Validators.minLength(4)]],
  //       location:[this.currEvent.location],
  //       description: [this.currEvent.description],
  //       visibility:[this.currEvent.visibility,Validators.required],
  //       start:[this.currEvent.start, Validators.required],
  //       startTime:[startTime, Validators.required],
  //       end:[this.currEvent.end, Validators.required],
  //       endTime:[endTime, Validators.required],
  //       recurrence:[this.currEvent.recurrence],
  //       isReminders:[this.currEvent.isReminders,Validators.required]
  //     })
  //     if(this.isManager || (this.user && e.visibility === 'private')){
  //       this.canEdit = true;
  //     }        
  //     this.isLoading = false;
  //   })
  // }

  // user:User
  // isManager = false
  // canEdit:boolean
  // @Input() day:DayCal
  // @Input() parentCalendar:any
  // typesEvent:Array<{id:string,value:string}> = [{id:'private',value:'פרטי'},{id:'public',value:'ציבורי'}]
  // hoursEvent:Array<{id:number,value:string}> = [{id:-1,value:'יומי'}]
  // currEvent:Event = new Event()
  // form:FormGroup;
  // isLoading=true;
  // isSending = false;
  // sendIsSuccess = false;
  // get f() { return this.form.controls; }

  // constructor(private calService:CalendarService,public bsModalRef: BsModalRef,
  //   private fb: FormBuilder,private localeService: BsLocaleService, private userService:UserService,
  //    private toastr:ToastrService) { 
  //     this.localeService.use('he')
  //     this.user = this.userService.getUser()
  //     if(this.user){
  //       this.isManager = this.userService.isManager(this.user)
  //     }
  //     for (let i = 0; i < 24; i++) {
  //       this.hoursEvent.push({id:i+1,value:this.padIdToHourString(i)+':00'},{id:i+1.5,value: this.padIdToHourString(i)+':30'})        //
  //     }
  // }
  // private padIdToHourString(id:number){
  //   if(id<10) return '0'+id
  //   return id
  // }
  ngOnInit() {   
  //   this.hePrimeCal = {
  //     firstDayOfWeek: 0,
  //     dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
  //     dayNamesShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ז'"],
  //     dayNamesMin: ["א","ב","ג","ד","ה","ו","ז"],
  //     monthNames: [ "ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר" ],
  //     monthNamesShort: [ "ינו'", "פבר'", "מרץ", "אפר'", "מאי", "יוני","יול'", "אוג'", "ספט'", "אוק'", "נוב'", "דצמ'" ],
  //     today: 'היום',
  //     clear: 'ניקוי'
  // }
  //   if(this.eventId === 0 && this.user){
  //     this.form =  this.fb.group({
  //       id: 0,
  //       summary: ['', [Validators.required, Validators.minLength(4)]],
  //       location:[''],
  //       description: [''],
  //       visibility:'private',
  //       start:[this.day? new Date(this.day.gregDate) :new Date(), Validators.required],
  //       startTime:[-1, Validators.required], 
  //       end:[this.day? new Date(this.day.gregDate) :new Date(), Validators.required],  
  //       endTime:[-1, Validators.required],   
  //       recurrence:[this.currEvent.recurrence],
  //       isReminders:[false,Validators.required]
  //     })
  //     this.canEdit = true;
  //     this.isLoading = false
  //     //console.log(this.form.value)
    }

  // }
  // consolLog(){
  //   //console.log(this.form.value)
  // }
  // create(){
  //   if(this.form.valid){
  //     this.isSending = true;
  //     const values = this.form.value;    
  //     Object.assign(this.currEvent,values) 
      
  //     if(values.startTime === -1){
  //       this.currEvent.start.setHours(0,0,0,0)
  //     }else if(values.startTime % 1){
  //       this.currEvent.start.setHours(parseInt(values.startTime)-1,30)
  //     }else{
  //       this.currEvent.start.setHours(parseInt(values.startTime)-1)
  //     }

  //     if(values.endTime === -1){
  //       this.currEvent.end.setHours(0,0,0,0)
  //     }else if(values.endTime % 1){
  //       this.currEvent.end.setHours(parseInt(values.endTime)-1,30)
  //     }else{
  //       this.currEvent.end.setHours(parseInt(values.endTime)-1)
  //     }     
  //     //console.log(this.currEvent)
  //     this.currEvent.id = 0
  //     this.currEvent.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      
  //     this.calService.create(this.currEvent,this.user.id)
  //     .subscribe(result=>{ 
  //         this.sendIsSuccess=true;  
  //         this.bsModalRef.hide();                
  //         this.toastr.success('האירוע נשמר בהצלחה') 
  //         if(this.parentCalendar){ // מרפרש את המידע בלוח שנה
  //           this.parentCalendar.buildHebCalender()
  //         }
  //     },err=>{     
  //       console.error(err)
  //       this.isSending = false;    
  //       this.toastr.error('אירעה שגיאה! נא לנסות שנית מאוחר יותר.')    
  //     })
  //   }
  // }
  // update(){
  //   if(this.form.valid){
  //     this.isSending = true;
  //     const values = this.form.value;    
  //     Object.assign(this.currEvent,values) 

  //     if(values.startTime === -1){
  //       this.currEvent.start.setHours(0,0,0,0)
  //     }else if(values.startTime % 1){
  //       this.currEvent.start.setHours(parseInt(values.startTime)-1,30)
  //     }else{
  //       this.currEvent.start.setHours(parseInt(values.startTime)-1)
  //     }

  //     if(values.endTime === -1){
  //       this.currEvent.end.setHours(0,0,0,0)
  //     }else if(values.endTime % 1){
  //       this.currEvent.end.setHours(parseInt(values.endTime)-1,30)
  //     }else{
  //       this.currEvent.end.setHours(parseInt(values.endTime)-1)
  //     }       

  //     this.calService.update(this.currEvent,this.user.id)
  //     .subscribe(result=>{ 
  //         this.sendIsSuccess=true;  
  //         this.bsModalRef.hide();                
  //         this.toastr.success('האירוע עודכן בהצלחה') 
  //         if(this.parentCalendar){ // מרפרש את המידע בלוח שנה
  //           this.parentCalendar.buildHebCalender()
  //         }
  //     },err=>{     
  //       console.error(err)
  //       this.isSending = false;    
  //       this.toastr.error('אירעה שגיאה! נא לנסות שנית מאוחר יותר.')    
  //     })
  //   }
  // }
  // delete(){
  //   if(!confirm('האם אתם בטוחים שברצונכם למחוק אירוע זה?\nשימו לב! פעולה זו הינה בלתי הפיכה!')) return
  //   this.calService.remove(this.currEvent.id)
  //     .subscribe(result=>{ 
  //         this.sendIsSuccess=true;  
  //         this.bsModalRef.hide();                
  //         this.toastr.success('האירוע נמחק בהצלחה')         
  //     },err=>{     
  //       console.error(err)
  //       this.isSending = false;    
  //       this.toastr.error('אירעה שגיאה! נא לנסות שנית מאוחר יותר.')    
  //     })
  // }

}
