import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Services } from 'src/app/models/services';
import { ServicesService } from 'src/app/services/services/services.service';

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

  constructor(private servicesService: ServicesService) {}

  getAllServices() {
    this.servicesService.getAllServices().subscribe((results) => {
      this.serviceDataSource = new MatTableDataSource(results.data);
      this.serviceDataSource.sort = this.sort;
      this.serviceDataSource.paginator = this.paginator;
    });
  }

  deleteService(id: string): void {
    this.servicesService.deleteService(id).subscribe({
      next: (res) => {
        alert('Product Deleted Successfully');
        this.getAllServices();
      },
      error: () => {
        alert('Error while deleting product');
      },
    });
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
