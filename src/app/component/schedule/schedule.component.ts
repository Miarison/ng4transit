import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleComponent as ScheduleComponentSource, DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, PopupCloseEventArgs, } from '@syncfusion/ej2-angular-schedule';
import { UserService } from 'src/app/services/api/user.service';
import { ScheduleService } from 'src/app/services/api/schedule.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { ScheduleStagesService } from 'src/app/services/api/schedule-stages.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-schedule',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
  @ViewChild('scheduleObj', { static: true })
  public scheduleObj: ScheduleComponentSource | undefined;

  public technicianFields: object = { text: 'Username', value: 'Id' };
  public TechnicianData: object[] = [];
  public scheduleStagesFields: object = { text: 'Name', value: 'Id' };
  public ScheduleStagesData: object[] = [];
  public isTechnician = true;
  
  public eventObject: EventSettingsModel = {
    dataSource: [],
    allowDeleting: true,
    allowEditing: true,
  }

  constructor(private userService: UserService, private scheduleService: ScheduleService, private userDataService: UserDataService, 
    private scheduleDataService: ScheduleDataService, private ScheduleStagesService: ScheduleStagesService, private authenticationService: AuthenticationService) { }

  private isUserTechnician(role: string){
    return role.toLowerCase().startsWith('technician');
  }

  ngOnInit(): void {
    this.isTechnician = this.isUserTechnician(AuthenticationService.getUserData().role);

    this.scheduleDataService.onAddEvent.subscribe((event) => this.onAddEvent(event));
    this.scheduleDataService.onChangeEvent.subscribe((event) => this.onChangeEvent(event));
    this.userDataService.users = []
    this.userService.getUsers()?.subscribe(data => {
      if (data.success) {
        const users = data.data;
        for (const user of users) {
          this.TechnicianData.push({
            Username: `${user.firstName} ${user.lastName}`,
            Id: user.id
          })
          this.userDataService.users.push(user);
        }
      }
    }, (err: any) => {
      console.log(err);
    });
    this.ScheduleStagesService.getScheduleStages()?.subscribe(data => {
      if (data.success) {
        const stages = data.data;
        for (const stage of stages) {
          this.ScheduleStagesData.push({
            Name: `${stage.name}`,
            Id: stage.id,
          })
        }
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  onAddEvent(event: any) {
    this.sendEvent(event);
  }
  onChangeEvent(event: any) {
    this.updateEvent(event);
  }

  getDateWithTimezone(date: Date) {
    const time = date.getTime();
    const output = new Date(time - date.getTimezoneOffset() * 60 * 1000);
    return output;
  }

  initDataSource() {
    const userId = AuthenticationService.getUserData().id;
    console.log(AuthenticationService.getUserData());
    this.scheduleService.getMySchedules(userId)?.subscribe(data => {
      if (data.success) {
        const dataSource = []
        for (const schedule of data.data) {
          dataSource.push({
            Id: parseInt(schedule.id),
            StartTime: this.getDateWithTimezone(new Date(schedule.date_from)),
            EndTime: this.getDateWithTimezone(new Date(schedule.date_to)),
            Subject: schedule.subject,
            Description: schedule.description,
            Technician: schedule.user,
            State: schedule.stage
          });
        }
        this.scheduleDataService.setSchedules(dataSource);
        this.scheduleObj?.addEvent(dataSource);
      }
    });
  }

  sendEvent(event: any) {
    const data = {
      'dateFrom': `${event.StartTime.getUTCFullYear()}-${event.StartTime.getUTCMonth() + 1}-${event.StartTime.getUTCDate()} ${event.StartTime.getUTCHours()}:${event.StartTime.getUTCMinutes()}:${event.StartTime.getUTCSeconds()}`,
      'dateTo': `${event.EndTime.getUTCFullYear()}-${event.EndTime.getUTCMonth() + 1}-${event.EndTime.getUTCDate()} ${event.EndTime.getUTCHours()}:${event.EndTime.getUTCMinutes()}:${event.EndTime.getUTCSeconds()}`,
      'user': event.Technician,
      'description': event.Description,
      'subject': event.Subject,
      'stage': event.State,
    }

    this.scheduleService.createSchedule(data)?.subscribe(schedule => console.log(schedule));
  }
  
  updateEvent(event: any) {
    const data = {
      'dateFrom': `${event.StartTime.getUTCFullYear()}-${event.StartTime.getUTCMonth() + 1}-${event.StartTime.getUTCDate()} ${event.StartTime.getUTCHours()}:${event.StartTime.getUTCMinutes()}:${event.StartTime.getUTCSeconds()}`,
      'dateTo': `${event.EndTime.getUTCFullYear()}-${event.EndTime.getUTCMonth() + 1}-${event.EndTime.getUTCDate()} ${event.EndTime.getUTCHours()}:${event.EndTime.getUTCMinutes()}:${event.EndTime.getUTCSeconds()}`,
      'user': event.Technician,
      'description': event.Description,
      'subject': event.Subject,
      'stage': event.State,
      'id': event.Id
    }

    this.scheduleService.updateSchedule(data)?.subscribe(schedule => console.log(schedule));
  }

  public eventBinding(event: any): void {
    this.scheduleDataService.dataBinding(event.dataSource);
  }
}