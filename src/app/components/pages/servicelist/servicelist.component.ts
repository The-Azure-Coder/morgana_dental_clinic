import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss'],
})
export class ServicelistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  services: Services[] = [];
  serviceDataSource!: MatTableDataSource<Services>;
  serviceColumns: string[] = ['serviceName', 'serviceCost', 'action'];

  constructor(private servicesService: ServicesService, private patientsService: PatientsService) { }


  getAllServices() {
    this.servicesService.getAllServices().subscribe((results) => {
      this.services = results.data
      this.serviceDataSource = new MatTableDataSource(results.data);
      this.serviceDataSource.sort = this.sort;
      this.serviceDataSource.paginator = this.paginator;
    });
  }

  deleteService(id: string): void {
    this.patientsService.getAllPatients().subscribe({
      next: (res) => {
        this.servicesService.getServicesById(id).subscribe({
          next: (res2) => {
            let groupFilter;
            groupFilter = res.data.filter(i => {
              return i.serviceId._id == res2.data._id;
            })

            if (groupFilter.length == 0) {


              this.servicesService.deleteService(id).subscribe({
                next: (res) => {
                  Swal.fire('Service Deleted Successfully');
                  this.getAllServices();
                }
              })
            } else {
              Swal.fire(`${res2.data.serviceName} service has ${groupFilter.length} patient(s) \nRemove patient(s) before proceeding.`)
            }
            console.log(groupFilter);
          }
        })
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.serviceDataSource.filter = filterValue.trim().toLowerCase();
    if (this.serviceDataSource.paginator) {
      this.serviceDataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllServices();
  }

}