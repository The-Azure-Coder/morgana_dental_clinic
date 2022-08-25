import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
})
export class DashNavComponent implements OnInit {

  dashRoute(route: string) {
    return this.router.url.includes(route)
  }
  

  constructor(private  router: Router) { }

  ngOnInit(): void {
  }

}
