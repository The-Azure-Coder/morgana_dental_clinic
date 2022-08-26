import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { DentistsService } from 'src/app/services/doctors/doctors.service';
import { Patients } from 'src/app/models/patient';
import { Dentists } from 'src/app/models/dentist';
import { Chart, registerables } from 'chart.js';
import { firstValueFrom } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss'],
})
export class Chart2Component implements OnInit {
  patients: any[] | Patients[] = [];
  dentists: any[] | Dentists[] = [];
  patientList: any[] | Dentists[] = [];
  dentistName: any[] = [];
  dentistPatientCount: number[] = [];

  constructor(
    private patientService: PatientsService,
    private dentistService: DentistsService
  ) {}

  getAllDentists() {
    this.dentistService.getAllDentists().subscribe((results) => {
      this.dentistName = results.data.map((mapitems) => {
        return mapitems.first_nm;
      });

      const myChart = new Chart('myChart', {
        type: 'pie',
        data: {
          labels: this.dentistName,
          datasets: [
            {
              label: 'cost of services',
              data: this.dentistPatientCount,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }

  async getDetistPatients() {
    const resp = await firstValueFrom(this.dentistService.getAllDentists());

    resp.data.forEach(async (dentist) => {
      const _results = await firstValueFrom(
        this.dentistService.getDentistPatients(dentist._id)
      );

      this.dentistPatientCount.push(_results.data.length);
    });
  }

  async ngOnInit() {
    await this.getDetistPatients();
    this.getAllDentists();
  }
}
