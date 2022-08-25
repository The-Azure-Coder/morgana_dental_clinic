import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/doctors/doctors.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {
  @Input() dentist!: Dentists

  dentistSub!: Subscription;
  dentistId!: string;
  routeSub!: Subscription;


  appointForm= this._formBuilder.group({
    first_nm: ['', Validators.required],
    last_nm: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    mobile: ['', Validators.required],
    address: ['', Validators.required],
    service: ['', Validators.required],
    age: ['', Validators.required],
    dob: ['', Validators.required],
 });

  constructor(private dentistService:DentistsService, private router: Router,private route: ActivatedRoute,private _formBuilder: FormBuilder) { }


  getDentistFromId(id: string): void{
    this.dentistSub = this.dentistService.getDentistsById(id).subscribe(theitem=>this.dentist = theitem.data)
  }
  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.dentistId = params['id'];
      this.getDentistFromId(this.dentistId);
  })
}

}
