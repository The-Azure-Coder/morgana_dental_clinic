import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ServicesService } from 'src/app/services/services/services.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import { Services } from 'src/app/models/services';
import { Dentists } from 'src/app/models/dentist';
import { Patients } from 'src/app/models/patient';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  encapsulation: ViewEncapsulation.None,

  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class AppointmentFormComponent implements OnInit {
  services: Services[] = []
  dentists: any[] | Dentists[] = []

  appointForm = new FormGroup({
    'first_nm': new FormControl('', [Validators.required]),
    'last_nm': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phoneNumber': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'dob': new FormControl('', [Validators.required]),
    'age': new FormControl('', [Validators.required]),
    'dentistId': new FormControl('', [Validators.required]),
    'serviceId': new FormControl('', [Validators.required]),

  })

  constructor(private servicesService: ServicesService, private patientsService: PatientsService, private dentistService: DentistsService, private _formBuilder: FormBuilder, private router: Router) { }
  getServicesList() {
    this.servicesService.getAllServices().subscribe(results => {
      this.services = results.data
      console.log(this.services)
    })
  }

  getDentistsList() {
    this.dentistService.getAllDentists().subscribe(results => {
      this.dentists = results.data
      console.log(this.dentists)
    })
  }

  onSubmit() {
    const formData = (this.appointForm.value as unknown) as Partial<Patients>
    if (this.appointForm.valid) {
      this.patientsService.createPatient(formData).subscribe({
        next: (res) => {
          Swal.fire('Appointment Booked successfully')
          this.router.navigate(['/']);
          console.log(formData)
        },
        error: () => {
          Swal.fire("Error While booking the appointment")

        }
      })
    } else {
      Swal.fire('Invalid Form')

    }
  }

  ngOnInit(): void {
    this.getDentistsList()
    this.getServicesList()
  }

}
