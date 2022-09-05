import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientsService } from 'src/app/services/patients/patients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dentistlist',
  templateUrl: './dentistlist.component.html',
  styleUrls: ['./dentistlist.component.scss'],
})
export class DentistlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dentists: Dentists[] = [];
  dentistDataSource!: MatTableDataSource<Dentists>;
  dentistColumns: string[] = [
    'first_nm',
    'last_nm',
    'email',
    'phoneNumber',
    'action',
  ];

  constructor(private dentistService: DentistsService, private patientsService: PatientsService) { }
  getDentistList() {
    this.dentistService.getAllDentists().subscribe({
      next: (res) => {
        this.dentistDataSource = new MatTableDataSource(res.data);
        this.dentistDataSource.sort = this.sort;
        this.dentistDataSource.paginator = this.paginator;
      },
    });
  }
  deleteDentist(id: string): void {
    this.patientsService.getAllPatients().subscribe({
      next: (res) => {
        this.dentistService.getDentistsById(id).subscribe({
          next: (res2) => {
            let dentistFilter;
            dentistFilter = res.data.filter(i => {
              return i.dentistId._id == res2.data._id;
            })

            if (dentistFilter.length == 0) {

              this.dentistService.deleteDentist(id).subscribe({
                next: (res) => {
                  Swal.fire('Dentist Deleted Successfully');
                  this.getDentistList();
                }
              })
            } else {
              Swal.fire(`Dr ${res2.data.last_nm} has ${dentistFilter.length} patient(s) \nRemove patient(s) before proceeding.`)
            }
          }
        })
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dentistDataSource.filter = filterValue.trim().toLowerCase();
    if (this.dentistDataSource.paginator) {
      this.dentistDataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getDentistList();
  }
}
