import { Component, Input, OnInit } from '@angular/core';
import { TimeLock } from 'src/app/model/time-lock';

@Component({
  selector: 'app-clock-time-details',
  templateUrl: './clock-time-details.component.html',
  styleUrls: ['./clock-time-details.component.css']
})
export class ClockTimeDetailsComponent implements OnInit {
  @Input() detailData: TimeLock [] = [];
  @Input() name: string | undefined;
  @Input() timeworked: string| undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
