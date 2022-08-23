import { Component, AfterViewInit, OnInit,ViewChild } from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Dentists } from 'src/app/models/dentist';
import { Patients } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { DentistsService } from 'src/app/services/doctors/doctors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {
  dentists: Dentists[]=[]

  dentistDataSource!: MatTableDataSource<Dentists>;
  patientDataSource!: MatTableDataSource<Patients>;
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];
  patientColumns: string[] = ['firstname', 'lastname','dentist','service','cost'];


  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dentistService:DentistsService, private patientService:PatientsService) {}

  

  
  getDentistsList(){
    this.dentistService.getAllDentists().subscribe({
      next: (res) => {
        console.log(res)
        // this.dentistDataSource = new MatTableDataSource(res.data);
         this.dentists = res.data
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
  
  }

}
