import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services/services.service';
import { Services } from 'src/app/models/services';
import { Dentists } from 'src/app/models/dentist';
import { DentistsService } from 'src/app/services/dentists/dentists.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  services: Services[] = [];
  dentists: Dentists[] = [];
  slides = [
    {
      image: "../../../../assets/images/home-img2.jpg",
      title: "Book Your Smile Transformation Now!",
      desc: "Experience top-notch dental care at our clinic! Our skilled team of expert doctors is ready to provide personalized services to enhance your oral health. ",
      link : "appoint",
      btn_title: "Book Now",
    },
    {
      image: "../../../../assets/images/home-img.jpg",
      title: "Discover Exceptional Dental Services",
      desc: "Unveil a world of premier dental services tailored just for you! Our clinic offers a comprehensive range of treatments designed to address your unique oral health needs.",
      link : "services",
      btn_title: "Services",
    },
    {
      image: "../../../../assets/images/login-img.jpg",
      title: "Meet Our Expert Dental Team",
      desc: "Get to know the faces behind your radiant smiles! Our exceptional dental staff is here to provide you with top-tier care and personalized attention.",
      link : "staff",
      btn_title: "Meet Staff",
    },
    {
      image: "../../../../assets/images/appoint-img.jpg",
      title: "Unlock Personalized Dental Care",
      desc: "Your journey to a healthier smile begins with us! Meet our expert team of dental professionals ready to cater to your unique needs.",
      link : "login",
      btn_title: "Login",
    },
    // add more slides as needed
  ];

  silderNavigate(link: string)
  {
     switch(link){
      case 'appoint':
      this.router.navigateByUrl('/appoint');
      break;

      case 'services':
        window.location.href = '#services';
      break;

      case 'staff':
        window.location.href = '#staff';
      break;

      case 'login':
        this.router.navigateByUrl('/login');
      break;
     }
  }






  currentSlideIndex = 0;
  slideTimer: any;

  pageEvent!: PageEvent;
  pageSizeOptions = [6, 12, 18, 100];
  pageSize = 6;
  length = 100;

  pageEvent2!: PageEvent;
  pageSizeOptions2 = [4, 8, 12, 16];
  pageSize2 = 4;
  length2 = 100;

  startSlideTimer() {
    this.slideTimer = setInterval(() => {
      this.nextSlide();
    }, 5000); // change slide every 5 seconds
  }

  stopSlideTimer() {
    clearInterval(this.slideTimer);
  }

  prevSlide() {
    this.stopSlideTimer();
    this.currentSlideIndex =
      (this.currentSlideIndex + this.slides.length - 1) % this.slides.length;
    this.startSlideTimer();
  }

  nextSlide() {
    this.stopSlideTimer();
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.startSlideTimer();
  }



  

  constructor(
    private servicesService: ServicesService,
    private dentistService: DentistsService,
    private router: Router
  ) { }

  getServicesList() {
    this.servicesService.getAllServices().subscribe((results) => {
      this.services = results.data.slice(0, 6);
      this.length = results.data.length;
    });
  }

  getDentistsList() {
    this.dentistService.getAllDentists().subscribe((results) => {
      this.dentists = results.data.slice(0, 4);
      this.length2 = results.data.length;
    });
  }

  getPageWithIndex(event: PageEvent) {
    let pageEvent = event;
    this.servicesService
      .getLimitedServices(++pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe((results) => {
        let start = 0;
        let end = pageEvent.pageSize;
        this.services = results.data.slice(start, end);
      });
  }

  getPageWithIndex2(event: PageEvent) {
    let pageEvent2 = event;
    this.dentistService
      .getLimitedDentists(++pageEvent2.pageIndex, pageEvent2.pageSize)
      .subscribe((results) => {
        console.log(results);
        let start = 0;
        let end = pageEvent2.pageSize;
        if (pageEvent2.pageIndex > 0) {
          start = this.pageSize * --pageEvent2.pageIndex;
          end = this.pageSize * ++pageEvent2.pageIndex;
          console.log(start);
          console.log(end);
        }
        this.dentists = results.data.slice(start, end);
      });
  }
  ngOnInit(): void {
    this.startSlideTimer();
    this.getServicesList();
    this.getDentistsList();
  }
}
