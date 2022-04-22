import { Component, OnInit } from '@angular/core';
import { TimeLock } from 'src/app/model/time-lock';

@Component({
  selector: 'app-clock-time',
  templateUrl: './clock-time.component.html',
  styleUrls: ['./clock-time.component.css']
})
export class ClockTimeComponent implements OnInit {

  data: TimeLock[] = [];
  responses: any = [];
  donneee : TimeLock[] = [];
  detailClockTime:TimeLock [] = [];
  name: string | undefined;
  timeWorkedDetail: any;
  isDetailComponent = false;
  isNameClicked = true;
  isTimeLeaveOnBreak = false;
  isTimeReturnFromBreak = false;
  isTimeClockOut = false;
  constructor() {
   }

  ngOnInit(): void {
    this.getResponseJSON();
    this.getListTimeSheetGroupByName();
  }
  
  getResponseJSON(){
    this.responses.push(localStorage.getItem('time') || '{}');
    var jSonParse = JSON.parse(this.responses);

    jSonParse.forEach((element: any) => {
            this.donneee.push(element);
    }); 
    
  }
  getListTimeSheetGroupByName(){
      for(let timeSheet of this.donneee ){
          if( timeSheet.clockTime == 'clock in'){
             this.data.push(new TimeLock(timeSheet.name,timeSheet.clockTime,timeSheet.timeClock));
          }else if(timeSheet.clockTime == 'leave on break' || timeSheet.clockTime == 'return from break'  || timeSheet.clockTime == 'clock out'){
            this.data.push();
          }
      }
      return this.data;
   }
  getDetailClockTimeByName(name?:string){
    let dateIn: any;
    let dateOut: any;
    let dateLeave: any;
    let dateReturn: any;

    for(let timeClock of this.donneee){         

         if( timeClock.name === name ){
            this.name = name;
            this.isDetailComponent = true;
            this.isNameClicked = false;
            this.detailClockTime.push(new TimeLock(timeClock.name,timeClock.clockTime,timeClock.timeClock));
               
            if(timeClock.clockTime == 'clock in'){              
                  var dateClockIn = timeClock.timeClock;              
                  let dateClock = new Date(dateClockIn as string);
                  dateIn = dateClock.getTime();
            }
            
            if(timeClock.clockTime == 'leave on break'){                 
                 let dateLeaveOnBreakString = timeClock.timeClock;
                 let dateLeaveOnBreak = new Date(dateLeaveOnBreakString as string);
                 dateLeave = dateLeaveOnBreak.getTime();

                 this.isTimeLeaveOnBreak = true;
             }
              if(timeClock.clockTime == 'return from break'){                  
                 let dateReturnFromBreakString = timeClock.timeClock;
                 let dateReturnFromBreak = new Date(dateReturnFromBreakString as string);
                 dateReturn = dateReturnFromBreak.getTime();
                 this.isTimeReturnFromBreak = true;
              } 
              
              if(timeClock.clockTime == 'clock out'){
                  let  dateClockOutString = timeClock.timeClock;
                  let dateClockOut = new Date(dateClockOutString as string);
                  dateOut = dateClockOut.getTime();
                  this.isTimeClockOut = true;
           }
           
         }
     }
      if(this.isTimeLeaveOnBreak && this.isTimeReturnFromBreak){

        let diffTimeBreak = dateReturn - dateLeave;
        let diffTimeIO = dateOut - dateIn;
        let totalDiff =  diffTimeBreak+diffTimeIO;
        this.timeWorkedDetail = this.timeConversion(totalDiff);
      }
      else { 
        let diffTimeIO = dateOut - dateIn;        
        this.timeWorkedDetail = this.timeConversion(diffTimeIO);      
      }
  }
 
   timeConversion(duration: number) {
    const portions: string[] = [];
  
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }

    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      portions.push(minutes + 'm');
      duration = duration - (minutes * msInMinute);
    }
  
    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
      portions.push(seconds + 's');
    }
  
    return portions.join(' ');
  } 

}
