import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your are looged Out',
      showConfirmButton: false,
      timer: 1500
    })
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
