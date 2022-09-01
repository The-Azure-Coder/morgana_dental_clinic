import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(): boolean {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
      return false;
    }

    return true
  }

}
