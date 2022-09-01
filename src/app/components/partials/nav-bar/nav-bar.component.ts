import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  authenticated: boolean = this.isLoggedIn();

  constructor(private router: Router) { }
  headerRoute(route: string) {
    return this.router.url.includes(route)
  }


  ngOnInit(): void {
  }

  logOut() {
    alert('You are logged out')
    localStorage.removeItem('admin')
    localStorage.removeItem('user')
    this.router.navigate(['/']);
    this.authenticated = this.isLoggedIn();
  }



  isLoggedIn() {
    if (localStorage.getItem('admin') || localStorage.getItem('user')) {
      // console.log()
      return true
    } else {
      return false
    }


  }

}
