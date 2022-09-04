import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import Swal from 'sweetalert2';

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
  ) { }

  onSubmit() {
    const formData = this.dentistForm.value as unknown as Partial<Dentists>;
    if (this.dentistForm.valid) {
      this.dentistService.createDentist(formData).subscribe({
        next: (res) => {
          Swal.fire('Dentist added successfully');
          this.router.navigate(['/dentistList']);
          console.log(formData);
        },
        error: () => {
          Swal.fire('Error While booking the appointment');
        },
      });
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid form submission',
    })
  }

  ngOnInit(): void { }
}
