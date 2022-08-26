import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Patients } from 'src/app/models/patient';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DentistsService } from 'src/app/services/doctors/doctors.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  patients: any[] | Patients[] = [];
  patientDataSource!: MatTableDataSource<Patients>;
  patientColumns: string[] = [
    'first_nm',
    'last_nm',
    'dentist',
    'service',
    'regDate',
    'serviceCost',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private patientService: PatientsService,
    private dentistService: DentistsService
  ) {}

  getPatientList() {
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientDataSource = new MatTableDataSource(res.data);
        this.patientDataSource.sort = this.sort;
        this.patientDataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert('Error while fetching the patients');
      },
    });
  }

  deleteAppointment(id: string): void {
    this.patientService.deletePatient(id).subscribe({
      next: (res) => {
        alert('Product Deleted Successfully');
        this.getPatientList();
      },
      error: () => {
        alert('Error while deleting product');
      },
    });
  }

  getDetistPatients() {
    this.patientService.getAllPatients().subscribe((patients) => {
      this.patients = patients.data;
      this.patients.forEach((patient) => {
        this.dentistService
          .getDentistPatients(patient.dentistId._id)
          .subscribe((_results) => {
            // console.log(_results)
          });
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patientDataSource.filter = filterValue.trim().toLowerCase();
    if (this.patientDataSource.paginator) {
      this.patientDataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getPatientList();
    this.getDetistPatients();
  }
}
