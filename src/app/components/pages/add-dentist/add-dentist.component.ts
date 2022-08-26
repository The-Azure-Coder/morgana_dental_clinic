import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/doctors/doctors.service';

@Component({
  selector: 'app-add-dentist',
  templateUrl: './add-dentist.component.html',
  styleUrls: ['./add-dentist.component.scss'],
})
export class AddDentistComponent implements OnInit {
  dentistForm = new FormGroup({
    first_nm: new FormControl('', [Validators.required]),
    last_nm: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    docImg: new FormControl('', [Validators.required]),
    docDescrip: new FormControl('', [Validators.required]),
  });

  constructor(
    private dentistService: DentistsService,
    private router: Router
  ) {}

  onSubmit() {
    const formData = this.dentistForm.value as unknown as Partial<Dentists>;
    this.dentistService.createDentist(formData).subscribe({
      next: (res) => {
        alert('Appointment Booked successfully');
        this.router.navigate(['/dentistList']);
        console.log(formData);
      },
      error: () => {
        alert('Error While booking the appointment');
      },
    });
  }

  ngOnInit(): void {}
}
