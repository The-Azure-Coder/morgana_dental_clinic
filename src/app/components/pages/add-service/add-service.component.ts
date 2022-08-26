import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  serviceForm = new FormGroup({
    serviceName: new FormControl('', [Validators.required]),
    serviceCost: new FormControl('', [Validators.required]),
    serviceImg: new FormControl('', [Validators.required]),
    serviceImg2: new FormControl('', [Validators.required]),
    serviceDescrip: new FormControl('', [Validators.required]),
  });
  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) {}

  onSubmit() {
    const formData = this.serviceForm.value as unknown as Partial<Services>;
    this.servicesService.createService(formData).subscribe({
      next: (res) => {
        alert('Appointment Booked successfully');
        this.router.navigate(['/serviceList']);
        console.log(formData);
      },
      error: () => {
        alert('Error While booking the appointment');
      },
    });
  }

  ngOnInit(): void {}
}
