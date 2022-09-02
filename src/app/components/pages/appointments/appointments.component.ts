import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Patients } from 'src/app/models/patient';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DentistsService } from 'src/app/services/doctors/doctors.service';
import Swal from 'sweetalert2';

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
  ) { }

  getPatientList() {
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientDataSource = new MatTableDataSource(res.data);
        this.patientDataSource.sort = this.sort;
        this.patientDataSource.paginator = this.paginator;
      },
      error: (err) => {
        Swal.fire('Error while fetching the patients');
      },
    });
  }

  deleteAppointment(id: string): void {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.patientService.deletePatient(id).subscribe({
          next: (res) => {
            this.getPatientList();
          },
          error: () => {
            Swal.fire('Error while deleting appointment');
          },
        });
      }
    })
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
