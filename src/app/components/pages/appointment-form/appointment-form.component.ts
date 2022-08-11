import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],

  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class AppointmentFormComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    yesorno: ['', Validators.required],
    services: ['', Validators.required],

  });
  secondFormGroup = this._formBuilder.group({
     first_nm: ['', Validators.required],
     last_nm: ['', Validators.required],
     email: ['', Validators.required, Validators.email],
     mobile: ['', Validators.required],
     address: ['', Validators.required],
     age: ['', Validators.required],
     dob: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
  }

}
