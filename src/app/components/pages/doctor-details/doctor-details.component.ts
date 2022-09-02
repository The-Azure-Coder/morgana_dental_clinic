import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dentists } from 'src/app/models/dentist';
import { Patients } from 'src/app/models/patient';
import { Services } from 'src/app/models/services';
import { DentistsService } from 'src/app/services/doctors/doctors.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { ServicesService } from 'src/app/services/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {
  @Input() dentist!: Dentists
  services: Services[] = [];

  dentistSub!: Subscription;
  dentistId!: string;
  routeSub!: Subscription;


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

  });

  constructor(private dentistService: DentistsService, private patientsService: PatientsService, private router: Router, private route: ActivatedRoute, private serviceService: ServicesService) { }


  getDentistFromId(id: string): void {
    this.dentistSub = this.dentistService.getDentistsById(id).subscribe(theitem => this.dentist = theitem.data)
  }

  onSubmit() {
    console.log(this.appointForm.value)
    const formData = (this.appointForm.value as unknown) as Partial<Patients>
    if (this.appointForm.valid) {
      this.patientsService.createPatient(formData).subscribe(() => {
        this.router.navigate(['/'])
        Swal.fire("appointment Successful Added");
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form submission',
      })
    }
  }

  getServiceList(): void {
    this.serviceService.getAllServices().subscribe(results => {
      this.services = results.data
    })
  }

  ngOnInit(): void {
    this.getServiceList()

    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.dentistId = params['id'];
      this.getDentistFromId(this.dentistId);
    })
  }

}
