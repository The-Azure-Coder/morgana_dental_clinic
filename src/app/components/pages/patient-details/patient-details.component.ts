import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patients } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  @Input() patient!: Patients;
  patientSub!: Subscription;
  patientId!: string;
  routeSub!: Subscription;
  constructor(
    private patientsService: PatientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getpatientById(id: string): void {
    this.patientsService.getPatientById(id).subscribe((thePatient) => {
      this.patient = thePatient.data;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params['id'];
      this.getpatientById(this.patientId);
    });
  }
}
