import { LabelCal } from './label-cal';

export class DayCal {
    classes:string;
    date:string;
    gregDate:Date;
    heDate:string;
    objHeDate:any;
    isInMonth:boolean;
    events:Array<LabelCal> = new Array<LabelCal>();

    constructor(init?:Partial<DayCal>) {
        Object.assign(this, init);
    }
}
