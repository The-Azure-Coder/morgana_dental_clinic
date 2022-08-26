import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointDetailsComponent } from './view-appoint-details.component';

describe('ViewAppointDetailsComponent', () => {
  let component: ViewAppointDetailsComponent;
  let fixture: ComponentFixture<ViewAppointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAppointDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
