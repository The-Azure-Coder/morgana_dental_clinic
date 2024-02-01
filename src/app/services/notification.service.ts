import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private alertOptions: SweetAlertOptions | any = { toast: true, position: 'top-right', showConfirmButton: false, timer: 7 * 1000 };

  success(message: string, options?: SweetAlertOptions): void {
    Swal.fire({ ...this.alertOptions, icon: 'success', text: message, ...options });
  }

  error(message: string, options?: SweetAlertOptions): void {
    Swal.fire({ ...this.alertOptions, icon: 'error', text: message, ...options });
  }

  warning(message: string, options?: SweetAlertOptions): void {
    Swal.fire({ ...this.alertOptions, icon: 'warning', text: message, ...options });
  }

  info(message: string, options?: SweetAlertOptions): void {
    Swal.fire({ ...this.alertOptions, icon: 'info', text: message, ...options });
  }
}
