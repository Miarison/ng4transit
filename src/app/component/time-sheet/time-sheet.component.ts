import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { TimeLock } from 'src/app/model/time-lock';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SigninModel } from './../../model/signin-model';
import { Task } from './task';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

  timeSheetForm: any;
  dateTime : any;
  dataClock: TimeLock [] = [];
  timeSheet : TimeLock[] = [];
  dataClockTime: any = [];
  timeClock = new TimeLock();
  clockInClicked = false;
  public object = Task;
  messsageClockInError:string = '';

  constructor(private authenficationService: AuthenticationService,private timeSheetService: TimeSheetComponent) { 
         
  }
  ngOnInit(): void {
      this.timeSheetForm = new FormGroup({
        email : new FormControl(),
        password:new FormControl(),
        task : new FormControl()
    });
  }

  dateActuel = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  }); 
  
   getTimeSheet(elementDiv: string){
     const timeSheetdata = new SigninModel((this.timeSheetForm.get('email')).value,(this.timeSheetForm.get('password').value));
     this.authenficationService.authenticate(timeSheetdata).subscribe(
       (res: any) => {
        var result= JSON.stringify(res);
        var jsonn  = JSON.parse(result);
        let name = jsonn.data.firstname;
        const maDate: Date = new Date();
        let dateko = maDate.getFullYear() + '-' + (( maDate.getMonth() + 1)) + '-' +maDate.getDate() + ' ' + maDate.getHours() + ':' + maDate.getMinutes()+ ':' + maDate.getSeconds();
        let dateTime = new Date(dateko);
        //get element in div 
        const clockIn = document.getElementById('clockIn')?.innerText.toLowerCase();                
        const clockOut = document.getElementById('clockOut')?.innerText.toLowerCase();
        const leaveOnBreak = document.getElementById('leaveOnBreak')?.innerText.toLowerCase();
        const returnFromBreak = document.getElementById('returnFromBreak')?.innerText.toLowerCase();
        
        if(maDate && elementDiv !== 'clock in' && !this.verifyNameIsClockIn(name)){
            this.clockInClicked = true;
            this.messsageClockInError =  "please! check  'CLOCK IN' in  first ";
            this.timeSheetForm.reset();
            throw new Error(this.messsageClockInError);
        }
        if(clockIn as string == elementDiv){
            let clock = clockIn as string;
            this.timeClock = new TimeLock(name, clock,dateko);
        }

        if(clockOut as string  == elementDiv){
            let clock_out = clockOut as string;
            this.timeClock = new TimeLock(name,clock_out,dateko);
        }

        if(leaveOnBreak as string  == elementDiv){
            let leave_on_break = leaveOnBreak as string;
            this.timeClock = new TimeLock(name, leave_on_break,dateko);
        }
        
        if(returnFromBreak as string == elementDiv){
            let returnFrom_break = returnFromBreak as string;
            this.timeClock = new TimeLock(name, returnFrom_break,dateko);
        }

        this.dataClock.push(this.timeClock);
        let dataJSON = JSON.stringify(this.dataClock);
        localStorage.setItem('time',dataJSON);
        this.timeSheetForm.reset();
        },
         (error: any) => {
             throw error;
        }
   );
 }
 verifyNameIsClockIn(name: string): boolean{
   let isNameClicked = false;
   let dataTimeSheet: any = [];
   let results: TimeLock [] = [];
       dataTimeSheet.push(localStorage.getItem('time') || '{}');
   var dataParsed = JSON.parse(dataTimeSheet);
     dataParsed.forEach((element: any) => {
            results.push(element);
     });
     for(let timeClock of results ){
         if(timeClock.name === name){
              isNameClicked = true
         }
     }
     return isNameClicked;
 }


}
