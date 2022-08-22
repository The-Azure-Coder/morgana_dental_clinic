import { Component, AfterViewInit, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/doctors/doctors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstname', 'lastname', 'email'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dentistService:DentistsService) {}
  getDentistsList(){
    this.dentistService.getAllDentists().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (err) => {
        alert("Error while fetching the records")

      }})
  }

  ngOnInit(): void {
    this.getDentistsList()
  }

}
