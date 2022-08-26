import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent implements OnInit {
  service!: Services;
  serviceForm!: FormGroup;
  constructor(private serviceService: ServicesService, private router: Router, private route: ActivatedRoute) { }

  updateService() {
    this.serviceService.updateService(this.service._id, this.serviceForm.value).subscribe(() => {
      this.router.navigate(['/serviceList'])
    })
  }



  ngOnInit(): void {
    this.serviceService
      .getServicesById(this.route.snapshot.params['id'])
      .subscribe((results) => {
        this.service = results.data;
        this.serviceForm = new FormGroup({
          serviceName: new FormControl(results.data.serviceName, [
            Validators.required,
          ]),
          serviceCost: new FormControl(results.data.serviceCost, [Validators.required]),
          serviceImg: new FormControl(results.data.serviceImg, [
            Validators.required,
          ]),
          serviceImg2: new FormControl(results.data.serviceImg2, [
            Validators.required,
          ]),
          serviceDescrip: new FormControl(results.data.serviceDescrip, [
            Validators.required,
          ]),

        });
      });
  }
}
