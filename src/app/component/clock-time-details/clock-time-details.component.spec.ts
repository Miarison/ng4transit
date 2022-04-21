import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTimeDetailsComponent } from './clock-time-details.component';

describe('ClockTimeDetailsComponent', () => {
  let component: ClockTimeDetailsComponent;
  let fixture: ComponentFixture<ClockTimeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockTimeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockTimeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
