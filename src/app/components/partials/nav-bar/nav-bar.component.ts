import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  authenticated: boolean = this.isLoggedIn();
  constructor(private router: Router, private notif: NotificationService) { }
  headerRoute(route: string) {
    return this.router.url.includes(route)
  }

  ngOnInit(): void {
  }

  logOut() {
    this.notif.success('Logged Out Sucessfully')
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
