import { Component, AfterViewInit, OnInit,ViewChild } from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Dentists } from 'src/app/models/dentist';
import { Patients } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { DentistsService } from 'src/app/services/doctors/doctors.service';
import { ServicesService } from 'src/app/services/services/services.service';
import { Services } from 'src/app/models/services';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dentists: Dentists[]=[]
  services: Services[]=[]
  serviceCost: any[] |  Services[]=[]
  dentistLength!: number
  patientLength!: number
  serviceLength!: number

  dentistDataSource!: MatTableDataSource<Dentists>;
  patientDataSource!: MatTableDataSource<Patients>;
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  patientColumns: string[] = ['firstname', 'lastname','dentist','service','cost'];


  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dentistService:DentistsService, private patientService:PatientsService, private servicesService: ServicesService) {}

  
  getAllService(){

    this.servicesService.getAllServices().subscribe({
      next: (res) => {
        console.log(res)
        // this.dentistDataSource = new MatTableDataSource(res.data);
         this.services = res.data
         this.serviceLength = res.data.length
         console.log(this.dentistLength)
        this.patientDataSource.paginator = this.paginator
        // this.dataSource.sort = this.sort
      },
      error: (err) => {
        alert("Error while fetching the records")

      }})
  
  
  }
  
  getDentistsList(){
    this.dentistService.getAllDentists().subscribe({
      next: (res) => {
        console.log(res)
        // this.dentistDataSource = new MatTableDataSource(res.data);
         this.dentists = res.data
         this.dentistLength = res.data.length
         console.log(this.dentistLength)
        // this.dataSource.paginator = this.paginator
        // this.dataSource.sort = this.sort
      },
      error: (err) => {
        alert("Error while fetching the records")

      }})
  }

  getPatientList(){
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        console.log(res)
        this.patientDataSource = new MatTableDataSource(res.data);
        this.patientLength = res.data.length
      
      },error: (err) => {
        alert("Error while fetching the patients")
      }
    })
  }

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    this.getDentistsList()
    this.getPatientList()
    this.getAllService()
  
  }

}
