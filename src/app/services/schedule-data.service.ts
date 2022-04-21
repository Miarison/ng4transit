import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataService {
  private schedules: any;
  public onAddEvent: EventEmitter<any> = new EventEmitter();
  public onChangeEvent: EventEmitter<any> = new EventEmitter();

  setSchedules(schedules: any) {
    this.schedules = []
    for(const schedule of schedules){
      this.schedules.push({
        Id: schedule.Id,
        StartTime: schedule.StartTime,
        EndTime: schedule.EndTime,
        Subject: schedule.Subject,
        Description: schedule.Description,
        Technician: schedule.Technician,
        State: schedule.State
      })
    }
  }

  dataBinding(dataSource: any) {
    if (this.schedules.length < dataSource.length) {
      this.onAddEvent.emit(this.getNewInsertedSchedule(dataSource));
    }
    if (this.schedules.length === dataSource.length) {
      const scheduleChanged = this.getUpdatedSchedule(dataSource);
      console.log(scheduleChanged);
      if(scheduleChanged){
        this.onChangeEvent.emit(scheduleChanged);
      }
    }

    this.setSchedules(dataSource);
  }

  private getUpdatedSchedule(dataSource: any){
    for (const schedule of this.schedules) {
      const testSchedule = dataSource.filter((s: { Id: any; })=>s.Id == schedule.Id)[0];
      if(!(testSchedule.StartTime.getTime() === schedule.StartTime.getTime() && 
        testSchedule.EndTime.getTime() === schedule.EndTime.getTime() && 
        testSchedule.Description == schedule.Description && 
        testSchedule.Subject === schedule.Subject && testSchedule.State === schedule.State)){
        return testSchedule;
      }
    }
    return undefined;
  }

  private getNewInsertedSchedule(dataSource: any): any {
    let old_ids = new Set(this.schedules.map((schedule: { Id: any; }) => schedule.Id))
    let new_ids = new Set(dataSource.map((schedule: { Id: any; }) => schedule.Id))
    
    let difference = this.difference(new_ids, old_ids);
    if (difference) {
      let id = -1;
      for(const diff of difference.values()){
        id = diff;
        break;
      }
      return dataSource.filter((data: { Id: number; }) => data.Id === id)[0];
    }
    return undefined
  }

  private difference(A: Set<any>, B: Set<any>) {
    let difference = new Set(A);
    for (const el of B) {
      difference.delete(el);
    }
    return difference;
  }
}