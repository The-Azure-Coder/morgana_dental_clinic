import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dentists } from 'src/app/models/dentist';
import { Patients } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import { ServicesService } from 'src/app/services/services/services.service';
import { Services } from 'src/app/models/services';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dentists: Dentists[] = [];
  appointCost: number[] = [];
  services: Services[] = [];
  serviceCost: any[] | Services[] = [];
  dentistLength!: number;
  patientLength!: number;
  serviceLength!: number;
  totalSalary!: number;

  dentistDataSource!: MatTableDataSource<Dentists>;
  patientDataSource!: MatTableDataSource<Patients>;
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  patientColumns: string[] = [
    'firstname',
    'lastname',
    'dentist',
    'service',
    'cost',
  ];


  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dentistService: DentistsService,
    private patientService: PatientsService,
    private servicesService: ServicesService,
    private router: Router
  ) { }


  getAllService() {
    this.servicesService.getAllServices().subscribe({
      next: (res) => {
        this.services = res.data;
        this.serviceLength = res.data.length;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error While fetching results!',
          footer: '<a href="">Why do I have this issue?</a>'
        })

      },
    });
  }
  getDentistsList() {
    this.dentistService.getAllDentists().subscribe({
      next: (res) => {
        this.dentists = res.data;
        this.dentistLength = res.data.length;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error While fetching results!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      },
    });
  }
  getPatientList() {
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientDataSource = new MatTableDataSource(res.data);
        this.patientLength = res.data.length;
        this.patientDataSource.paginator = this.paginator;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error While fetching results!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      },
    });
  }
  getTotalSalary() {
    this.patientService.getAllPatients().subscribe(results => {
      this.appointCost = results.data.map(mapitems => {
        return mapitems.serviceId.serviceCost

      })
      this.totalSalary = this.appointCost.reduce((a, b) => {
        return a += b;
      }, 0)


      console.log(this.totalSalary)
    })
  }

  ngOnInit(): void {
    this.getTotalSalary()
    this.getDentistsList();
    this.getPatientList();
    this.getAllService();
  }
}
