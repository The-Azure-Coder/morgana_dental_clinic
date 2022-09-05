import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Dentists } from 'src/app/models/dentist';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-dentist',
  templateUrl: './edit-dentist.component.html',
  styleUrls: ['./edit-dentist.component.scss']
})
export class EditDentistComponent implements OnInit {
  dentist!: Dentists;
  dentistForm!: FormGroup;

  constructor(private dentistService: DentistsService, private router: Router, private route: ActivatedRoute,) { }

  updateDentist() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.dentistService.updateService(this.dentist._id, this.dentistForm.value).subscribe(() => {
          this.router.navigate(['/dentistList'])
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  ngOnInit(): void {

    this.dentistService.getDentistsById(this.route.snapshot.params['id']).subscribe((results) => {
      this.dentist = results.data;
      this.dentistForm = new FormGroup({
        'first_nm': new FormControl(results.data.first_nm, [Validators.required]),
        'last_nm': new FormControl(results.data.last_nm, [Validators.required]),
        'email': new FormControl(results.data.email, [Validators.required, Validators.email]),
        'phoneNumber': new FormControl(results.data.phoneNumber, [Validators.required]),
        'docDescrip': new FormControl(results.data.docDescrip, [Validators.required]),
        'docImg': new FormControl(results.data.docImg, [Validators.required]),
      })


    })




  }


}

