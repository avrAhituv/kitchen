import * as moment from 'moment';
import 'moment-timezone'

//**
/* תואם לאובייקט האירועים של גוגל קלנדר
.* https://developers.google.com/calendar/create-events
/*
*/
export class Event {
    id:number;
    summary:string; //'Google I/O 2015',
    location:string; //'800 Howard St., San Francisco, CA 94103',
    description:string; //'A chance to hear more about Google\'s developer products.',
    start:Date// {'dateTime': '2015-05-28T09:00:00-07:00','timeZone': 'America/Los_Angeles' };
    end:Date //{'dateTime': '2015-05-28T17:00:00-07:00','timeZone': 'America/Los_Angeles' }
    timeZone:string;
    recurrence:Array<string> // [ 'RRULE:FREQ=DAILY;COUNT=2'],
   
    reminders: {useDefault:boolean, overrides:Array<{method:string,minutes:number}> } // {'useDefault': false,'overrides': [ {'method': 'email', 'minutes': 24 * 60}, {'method': 'popup', 'minutes': 10} ] }
    visibility:string
    isReminders:boolean
    
    constructor(event?:any) {
       if(!event) return;

       this.id = event.id || event.Id
       this.summary = event.summary || event.Summary
       this.location = event.location || event.Location
       this.description = event.description || event.Description
       this.visibility = event.visibility || event.Visibility
       this.timeZone = event.TimeZone
       this.start = event.StartDateTime
       this.end = event.EndDateTime
       this.recurrence = event.Recurrence       
       this.isReminders = event.IsReminders

       if(event.TimeZone){
        this.start = moment.utc(event.StartDateTime+'Z','YYYY-MM-DD HH:mm').tz(event.TimeZone).toDate()    // moment(new Date(event.StartDateTime+'Z')).tz(event.TimeZone).toDate() //moment(event.StartDateTime+'Z','YYYY-MM-DD HH:mm').toDate()//.tz(event.TimeZone).toDate()    
        this.end = moment.utc(event.EndDateTime+'Z','YYYY-MM-DD HH:mm').tz(event.TimeZone).toDate() 
        console.log(this)
       }else if(event.StartDateTime || event.EndDateTime){
            if(event.StartDateTime)
                this.start = new Date(event.StartDateTime)
            if(event.EndDateTime)
                this.end = new Date(event.EndDateTime)
       }
    }

    saveToDB(){
        return {
            "Id":this.id?this.id:0,
            "Summary":this.summary,
            "Location":this.location,
            "Description":this.description,
            "Visibility":this.visibility,
            "StartDateTime":this.start,
            "EndDateTime":this.end,
            "TimeZone":this.timeZone,
            "Recurrence":this.recurrence,
            "IsReminders":this.isReminders
        }
    }
}
