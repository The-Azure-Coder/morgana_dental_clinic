import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Dentists } from 'src/app/models/dentist';
import { Patients } from 'src/app/models/patient';
import { Services } from 'src/app/models/services';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { ServicesService } from 'src/app/services/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
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
    console.log('here')
    const formData = (this.appointForm.value as unknown) as Partial<Patients>
    if (this.appointForm.valid) {
      this.patientsService.createPatient(formData).subscribe({
        next: (res) => {
          Swal.fire('Appointment Booked successfully')
          this.router.navigate(['/appointments']);
          console.log(formData)
        },
        error: () => {
          Swal.fire("Error While booking the appointment")

        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid Form Submission',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

  ngOnInit(): void {
    this.getDentistsList()
    this.getServicesList()
  }









}
