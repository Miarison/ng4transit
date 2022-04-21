import { TestBed } from '@angular/core/testing';

import { ScheduleStagesService } from './schedule-stages.service';

describe('ScheduleStagesService', () => {
  let service: ScheduleStagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleStagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
