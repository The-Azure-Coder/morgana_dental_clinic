import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/doctors/doctors.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

  constructor(private dentistService: DentistsService) { }

  getDentistList() {
    this.dentistService.getAllDentists().subscribe({
      next: (res) => {
        this.dentistDataSource = new MatTableDataSource(res.data);
        this.dentistDataSource.sort = this.sort;
        this.dentistDataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('Error while fetching the patients');
      },
    });
  }



  deleteDentist(id: string): void {
    this.dentistService.deleteDentist(id).subscribe({
      next: (res) => {
        alert('Product Deleted Successfully');
        this.getDentistList();
      },
      error: () => {
        alert('Error while deleting product');
      },
    });
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
