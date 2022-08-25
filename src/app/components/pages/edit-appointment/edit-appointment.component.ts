import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Dentists } from 'src/app/models/dentist';
import { Patients } from 'src/app/models/patient';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DentistsService } from 'src/app/services/doctors/doctors.service';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';
import { PatientsService } from 'src/app/services/patients/patients.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {
  dentists: Dentists[]=[]
  services: Services[]=[]

  ID : string | undefined = this.route.snapshot.params['id'];
  patient!: Patients;
  appointForm!: FormGroup;

  patientSub!: Subscription;
  patientId!: string;
  routeSub!: Subscription;

  // getters
  get G_first_nm() {return this.appointForm.get('first_nm')}
  get G_last_nm() {return this.appointForm.get('last_nm')}
  get G_email() {return this.appointForm.get('email')}
  get G_phoneNumber() {return this.appointForm.get('phoneNumber')}
  get G_address() {return this.appointForm.get('address')}
  get G_dob() {return this.appointForm.get('dob')}
  get G_age() {return this.appointForm.get('age')}
  get G_dentistId() {return this.appointForm.get('dentistId')}
  get G_serviceId() {return this.appointForm.get('serviceId')}

  constructor(private dentistService:DentistsService,private patientsService:PatientsService,private servicesService: ServicesService,private router: Router,private route: ActivatedRoute,private _formBuilder: FormBuilder) { }
  getdoctorList(): void{
    this.dentistService.getAllDentists().subscribe(results=>{
      this.dentists = results.data
    })
  }

  getServicesList(): void{
   this.servicesService.getAllServices().subscribe(results=>{
    this.services = results.data
   })
  }

 updatePatient(){
  this.patientsService.updatePatient(this.patient._id,this.appointForm.value).subscribe(()=>{
    this.router.navigate(['/appointments'])
  })
 }

  ngOnInit(): void {
    this.getServicesList()
    this.getdoctorList()
    this.patientsService.getPatientById(this.route.snapshot.params['id']).subscribe((results) => {
      this.patient = results.data;
      this.appointForm = new FormGroup({
        'first_nm': new FormControl(results.data.first_nm,[Validators.required]),
        'last_nm': new FormControl(results.data.last_nm,[Validators.required]),
        'email': new FormControl(results.data.email,[Validators.required, Validators.email]),
        'phoneNumber': new FormControl(results.data.phoneNumber,[Validators.required]),
        'address': new FormControl(results.data.address,[Validators.required]),
        'dob': new FormControl(results.data.dob,[Validators.required]),
        'appointDate': new FormControl(results.data.appointDate,[Validators.required]),
        'age': new FormControl(results.data.age,[Validators.required]),
        'dentistId': new FormControl(results.data.dentistId,[Validators.required]),
        'serviceId': new FormControl(results.data.serviceId,[Validators.required]),
      })

      this.dentistService.getAllDentists().subscribe(_results=>{
        const dentists = _results.data;
        const dentist = dentists.filter((dentist) => dentist._id == results.data.dentistId._id)[0];

        this.appointForm.controls['dentistId'].setValue(dentist._id );
      })

      this.servicesService.getAllServices().subscribe(_results=>{
        const services = _results.data;
        const service = services.filter((service) => service._id == results.data.serviceId._id)[0];
        this.appointForm.controls['serviceId'].setValue(service._id );


      })
    })




  }

}

