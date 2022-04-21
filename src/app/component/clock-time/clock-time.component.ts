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
  isClockIn = false;
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
      for(let i = 0; i < this.donneee.length ; i++ ){
          if(this.donneee[i].clockTime == 'clock in'){
             this.data.push(new TimeLock(this.donneee[i].name,this.donneee[i].clockTime,this.donneee[i].timeClock));
          }else if(this.donneee[i].clockTime == 'leave on break' || this.donneee[i].clockTime == 'return from break'  || this.donneee[i].clockTime == 'clock out'){
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
    
    for(let i = 0; i <this.donneee.length; i++){          
         if(this.donneee[i].name === name ){

            this.name = name;
            this.isDetailComponent = true;
            this.isNameClicked = false;
            this.detailClockTime.push(new TimeLock(this.donneee[i].name,this.donneee[i].clockTime,this.donneee[i].timeClock));
               
            if(this.donneee[i].clockTime == 'clock in'){              
                  var dateClockIn = this.donneee[i].timeClock;              
                   let dateClock = new Date(dateClockIn as string);
                  dateIn = dateClock.getTime();
            }
            
            if(this.donneee[i].clockTime == 'leave on break'){                 
                 let dateLeaveOnBreakString = this.donneee[i].timeClock;
                 let dateLeaveOnBreak = new Date(dateLeaveOnBreakString as string);
                 dateLeave = dateLeaveOnBreak.getTime();

                 this.isTimeLeaveOnBreak = true;
             }
              if(this.donneee[i].clockTime == 'return from break'){                  
                 let dateReturnFromBreakString = this.donneee[i].timeClock;
                 let dateReturnFromBreak = new Date(dateReturnFromBreakString as string);
                 dateReturn = dateReturnFromBreak.getTime();
                 this.isTimeReturnFromBreak = true;
              } 
              
              if(this.donneee[i].clockTime == 'clock out'){
                  let  dateClockOutString = this.donneee[i].timeClock;
                  let dateClockOut = new Date(dateClockOutString as string);
                   dateOut = dateClockOut.getTime();
           }
           
         }
     }
      if(this.isTimeLeaveOnBreak && this.isTimeReturnFromBreak){
        let  diffTimeBreak = dateReturn - dateLeave;
        let diffTimeIO = dateOut - dateIn;
        let totalDiff =  diffTimeBreak+diffTimeIO;
        this.timeWorkedDetail = this.timeConversion(totalDiff);
      }else{
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
