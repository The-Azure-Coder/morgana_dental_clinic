import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  serviceForm = new FormGroup({
    serviceName: new FormControl('', [Validators.required]),
    serviceCost: new FormControl('', [Validators.required]),
    serviceImg: new FormControl(''),
    serviceImg2: new FormControl(''),
    serviceDescrip: new FormControl('', [Validators.required]),
  });
  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) { }
  onSubmit() {
    const formData = this.serviceForm.value as unknown as Partial<Services>;
    if (this.serviceForm.valid) {
      this.servicesService.createService(formData).subscribe({
        next: (res) => {
          Swal.fire('Services added successfully');
          this.router.navigate(['/serviceList']);
          console.log(formData);
        },
        error: () => {
          Swal.fire('Error While adding a service');
        },
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form submission',
      })
    }
  }

  ngOnInit(): void { }
}
