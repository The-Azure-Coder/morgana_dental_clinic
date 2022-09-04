import { Component, OnInit, Input } from '@angular/core';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patients } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-appoint-details',
  templateUrl: './view-appoint-details.component.html',
  styleUrls: ['./view-appoint-details.component.scss'],
})
export class ViewAppointDetailsComponent implements OnInit {
  @Input() dentist!: Dentists;
  patients: any[] | Patients[] = [];
  patientSub!: Subscription;
  patientId!: string;
  routeSub!: Subscription;

  constructor(
    private dentistService: DentistsService,
    private patientService: PatientsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getDetistPatients(id: string) {
    this.dentistService.getDentistPatients(id).subscribe((patients) => {
      this.patients = patients.data;
      console.log(patients);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.patientId = params['id'];
      this.getDetistPatients(this.patientId);
    });
  }
}
