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
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.serviceService.updateService(this.service._id, this.serviceForm.value).subscribe(() => {
          this.router.navigate(['/serviceList'])
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
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
          serviceImg: new FormControl(results.data.serviceImg,),
          serviceImg2: new FormControl(results.data.serviceImg2,),
          serviceDescrip: new FormControl(results.data.serviceDescrip, [
            Validators.required,
          ]),

        });
      });
  }
}
