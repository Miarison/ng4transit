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
  timeWorkedDetail: string | undefined;
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
    for(let i = 0; i <this.donneee.length; i++){ 
         if(this.donneee[i].name === name ){
            this.name = name;
            this.isDetailComponent = true;
            this.isNameClicked = false;
            this.detailClockTime.push(new TimeLock(this.donneee[i].name,this.donneee[i].clockTime,this.donneee[i].timeClock));
            if(this.donneee[i].clockTime == 'clock in'){
              const dateClockIn = this.donneee[i].timeClock;              
              let dateClock = new Date(dateClockIn as string);
              let nouveaDate = this.convertStringToDate(dateClockIn as string);
              console.log(nouveaDate);
              
              //test date 
              // var t1 = new Date();
              // var t2 = new Date();
              // let autredateString ='2022-04-20T20:00:00'
              // let newAutreDate = new Date(autredateString);
              // console.log('autre date '+newAutreDate.getTime());
              
              // var dif = t1.getHours() - newAutreDate.getHours();
              // console.log('diffff '+dif);
              
              
              // let dateString = '20/4/2022 11:57:80';  
              // let momentVariable = moment(dateString, 'MM-DD-YYYYHH:mm:ss');  
              // let stringvalue = momentVariable.format('MM-DD-YYYYHH:mm:ss');   
             
              // let dateString = '2022-04-20T00:00:00' 
              // let newDate = new Date(dateString);
              // var diff2Date = Math.abs((newAutreDate.getTime() - newDate.getTime())/1000);
              // console.log('test diff entre 2 date = '+diff2Date);
              
            } if(this.donneee[i].clockTime == 'leave on break'){
              const dateLeaveOnBreak = this.donneee[i].timeClock;
              console.log('date leave on break '+dateLeaveOnBreak);
              
           }if(this.donneee[i].clockTime == 'retrun from break'){
               const dateReturnFromBreak = this.donneee[i].timeClock;
               console.log('date return from break '+ this.donneee[i].timeClock)
           }if(this.donneee[i].clockTime == 'clock out '){
               const dateClockOut = this.donneee[i].timeClock;
               console.log('date clock out '+dateClockOut);
               

           }
            
         }
     }
  }
  convertStringToDate(dateString: string): Date{
       let dateSplit = dateString.replace('/','-');    
       let dateNoSpace = dateSplit.replace(' ','T');
       let dateFormat = new Date(dateNoSpace); 
       return dateFormat
  }

}
