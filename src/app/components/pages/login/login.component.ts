import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { Users } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private userService: UserService, private notif: NotificationService) { }

  // onSubmit() {
  //   const formData = this.loginForm.value as unknown as Partial<Users>;
  //   if (this.loginForm.valid) {
  //     this.userService.loginUser(formData).subscribe(res => {
  //       if (res.data.existUser?.role === 'user' && res.loginUser) {
  //         Swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'User Sccessfully logged in',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //         localStorage.setItem('user', res.loginUser)
  //         localStorage.removeItem('admin')
  //         location.href = "/appoint";
  //       } else if (res.data.existUser?.role === 'admin' && res.loginUser) {
  //         console.log(res)
  //         Swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'Admin Logged in Successfully',
  //           showConfirmButton: false,
  //           timer: 1500
  //         })
  //         localStorage.setItem('admin', res.loginUser)
  //         this.router.navigate(['/dashboard'])
  //         localStorage.removeItem('user')
  //       }
  //       else {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Unauthorized User',
  //         })
  //       }
  //     }
  //     )
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Invalid form submission',
  //     })

  //   }
  // }
  onSubmit() {
    const formData = this.loginForm.value as unknown as Partial<Users>;
    if (this.loginForm.valid) {
      this.userService.loginUser(formData).subscribe({
        next:(res)=>{
          if (res.data.existUser?.role === 'user' && res.loginUser) {
              this.notif.success('User Sccessfully logged in');
              localStorage.setItem('user', res.loginUser)
              localStorage.removeItem('admin')
              this.router.navigate(['/appoint'])
          }else if (res.data.existUser?.role === 'admin' && res.loginUser){
            this.notif.success('Admin Logged in Successfully')
            this.router.navigate(['/dashboard'])
            localStorage.removeItem('user')
            localStorage.setItem('admin', res.loginUser)
          }else{
            this.notif.error('Unauthorized User');
          }
        }
      })
    }else {
       this.notif.error('Invalid form submission');
    }
  }

  ngOnInit(): void {
  }

}
