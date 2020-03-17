import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Event } from '../classes/event';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { UserService } from '../../user/user.service';
// import { User } from '../../user/user.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  eventsChanged: Observable<Array<Event>>;
  private eventsChangedBehavior: BehaviorSubject<Array<Event>>;
  start:Date
  end:Date
  // user:User
  baseUrl = "https://new.server.campush.co.il/api/calendar" // "http://localhost:4201/api/calendar" //    
  currentMethod:string

  // constructor(private http:HttpClient,private userService:UserService) { 
  //   this.eventsChangedBehavior = new BehaviorSubject<Array<Event>>([]);
  //   this.eventsChanged = this.eventsChangedBehavior.asObservable();
  //   // this.user = this.userService.getUser()
  // }

// getEventById(eventId:number ,userId?:number):Observable<Event>{    
//     if(!userId) userId = this.user? this.user.id : 0
//     return this.http.get<Event>(`${this.baseUrl}/Get/${eventId}/user/${userId}`).pipe(
//       map(res => new Event(res)));
// }

// getEvents(userId?:number):Observable<Array<Event>>{    
//     this.currentMethod = 'getEvents'
//     if(!userId) userId =  this.user? this.user.id : 0
//     return this.http.get<Array<Event>>(`${this.baseUrl}/GetAllForUser/${userId}`).pipe(
//       map(res => {
//         let events = res.map(e=> new Event(e))   
//         this.eventsChangedBehavior.next(events);
//         return events
//     }));
// }

// getEventsBetweenDates(start?:string,end?:string,userId?:number):Observable<Array<Event>>{  
//   this.currentMethod = 'getEventsBetweenDates'
//   if(!start) start = moment(this.start).format('YYYY-MM-DD') 
//   if(!end) end = moment(this.end).format('YYYY-MM-DD') 
//   if(!userId) userId = this.user? this.user.id : 0
//   return this.http.get<Array<Event>>(`${this.baseUrl}/GetAllBetweenDate/${userId}/start/${start}/end/${end}`).pipe(
//     map(res => {
//      let events = res.map(e=> new Event(e))   
//      this.eventsChangedBehavior.next(events)
//      return events
//   }));
// }

// create(event:Event,userId?:number){
//   if(!userId) userId = this.user? this.user.id : 0
//   var data = event.saveToDB()
//   console.log(data)
//   return this.http.post<Event>(`${this.baseUrl}/Create/${userId}`,data)
//   .pipe(map(result=>{
//     const event = new Event(result)
//     console.log(event)
//     let events = [...this.eventsChangedBehavior.value,event]
//     this.eventsChangedBehavior.next(events)
//     return event
//   }))
// }

// update(event:Event,userId?:number){
//   if(!userId) userId = this.user? this.user.id : 0
//   var data = event.saveToDB()
//   console.log(data)
//   return this.http.post<Event>(`${this.baseUrl}/update/${userId}`,data)
//   .pipe(map(result=>{
//     if(this.currentMethod){     
//       this[this.currentMethod]().subscribe()
//     }    
//   }))
// }

// remove(eventId:number){
//   if(!eventId || !this.user || !this.user.id) return
//   return this.http.delete(`${this.baseUrl}/Delete/${eventId}/user/${this.user.id}`)
//   .pipe(map(result=>{
//     let events = this.eventsChangedBehavior.value
//     events.splice(events.findIndex(e=>e.id===eventId),1)
//     this.eventsChangedBehavior.next(events)
//   }))
// }

}
