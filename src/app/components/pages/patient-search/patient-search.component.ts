import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { Patients } from 'src/app/models/patient';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {
  patient!: Patients;

  searchForm = new FormGroup({
    'email': new FormControl(''),
  }
  )


  constructor(private patientService: PatientsService) { }

  searchPatient() {
    const formData = this.searchForm.value as unknown as Partial<Patients>;
    console.log(formData)
    this.patientService.patientSearch(formData).subscribe(patient => {
      this.patient = patient.data
    })
  }

  ngOnInit(): void {


  }

}
