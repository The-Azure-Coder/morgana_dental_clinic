import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services/services.service';
import { Services } from 'src/app/models/services';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/doctors/doctors.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  services: Services[]=[]
  dentists: Dentists[]=[]

  pageEvent !: PageEvent;
  pageSizeOptions = [3, 6,12,18];
  pageSize = 3;
  length = 100;


  pageEvent2 !: PageEvent;
  pageSizeOptions2 = [4, 8,12,16];
  pageSize2 = 4;
  length2 = 100;

  constructor(private servicesService: ServicesService, private dentistService: DentistsService) { }

  getServicesList(){
    this.servicesService.getAllServices().subscribe(results=>{
      this.services = results.data.slice(0,3)
      this.length =results.data.length
      console.log(this.services)
    })
  }

  getDentistsList(){
    this.dentistService.getAllDentists().subscribe(results=>{
      this.dentists = results.data.slice(0,4)
      this.length2 =results.data.length
      console.log(this.dentists)
    })
  }

  getPageWithIndex(event:PageEvent){
    let pageEvent = event
    this.servicesService.getLimitedServices(++pageEvent.pageIndex, pageEvent.pageSize).subscribe((results)=>{
      let start = 0
      let end = pageEvent.pageSize
      // if(pageEvent.pageIndex > 0){
      //   start = this.pageSize * --pageEvent.pageIndex;
      //   end = this.pageSize * ++pageEvent.pageIndex;
      //   console.log(start)
      //   console.log(end)
      // }
      this.services = results.data.slice(start,end);
    })
  }

  getPageWithIndex2(event:PageEvent){
    let pageEvent2 = event
    this.dentistService.getLimitedDentists(++pageEvent2.pageIndex, pageEvent2.pageSize).subscribe((results)=>{
      let start = 0
      let end = pageEvent2.pageSize
      if(pageEvent2.pageIndex > 0){
        start = this.pageSize * --pageEvent2.pageIndex;
        end = this.pageSize * ++pageEvent2.pageIndex;
        console.log(start)
        console.log(end)
      }
      this.dentists= results.data.slice(start,end);
    })
  }
  ngOnInit(): void {
    this.getServicesList()
    this.getDentistsList()
  }

}
