import { Event } from './event';

export class LabelCal {
    classes:string;
    value:string;
    color:string;
    eventId:number = 0;
    event?:Event

    constructor(init?:Partial<LabelCal>) {
        Object.assign(this, init);
    }
}
