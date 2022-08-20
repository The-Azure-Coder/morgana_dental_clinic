import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  @Input() service!: Services


  serviceSub!: Subscription;
  serviceId!: string;
  routeSub!: Subscription;

  appointForm = this._formBuilder.group({
    first_nm: ['', Validators.required],
    last_nm: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    mobile: ['', Validators.required],
    address: ['', Validators.required],
    dentist: ['', Validators.required],
    age: ['', Validators.required],
    dob: ['', Validators.required],
 });

  constructor(private servicesService:ServicesService, private router: Router,private route: ActivatedRoute,private _formBuilder: FormBuilder) { }
  

  getServiceFromId(id: string): void{
    this.serviceSub = this.servicesService.getServicesById(id).subscribe(theitem=>this.service = theitem.data)
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.serviceId = params['id'];
      this.getServiceFromId(this.serviceId);
  })

  }

}
