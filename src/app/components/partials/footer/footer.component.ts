import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  footerRoute(route: string) {
    return this.router.url.includes(route)
  }

  getNews() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Subscription Still in development!',

    })
  }

  ngOnInit(): void {
  }



}
