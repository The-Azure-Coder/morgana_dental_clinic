import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { Patients } from 'src/app/models/patient';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  dentists: Dentists[] = []
  @Input() service!: Services
  serviceSub!: Subscription;
  serviceId!: string;
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

  constructor(private servicesService: ServicesService, private patientsService: PatientsService, private dentistService:
    DentistsService, private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder) { }

  getServiceFromId(id: string): void {
    this.serviceSub = this.servicesService.getServicesById(id).subscribe(theitem => this.service = theitem.data)
  }

  getdoctorList(): void {
    this.dentistService.getAllDentists().subscribe(results => {
      this.dentists = results.data
    })
  }

  onSubmit() {
    console.log(this.appointForm.value)
    if (this.appointForm.valid) {
      const formData = (this.appointForm.value as unknown) as Partial<Patients>
      this.patientsService.createPatient(formData).subscribe(() => {
        this.router.navigate(['/'])
        Swal.fire("appointment Successful Added");
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form submission!',
        footer: '<a href="">Why do I have this issue?</a>'
      })

    }
  }

  ngOnInit(): void {
    this.getdoctorList()
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.serviceId = params['id'];
      this.getServiceFromId(this.serviceId);



    })

  }

}

