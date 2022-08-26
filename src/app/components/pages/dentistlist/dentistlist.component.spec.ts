import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistlistComponent } from './dentistlist.component';

describe('DentistlistComponent', () => {
  let component: DentistlistComponent;
  let fixture: ComponentFixture<DentistlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentistlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
