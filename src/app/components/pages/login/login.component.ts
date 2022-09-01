import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { Users } from 'src/app/models/user';

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

  constructor(private router: Router, private userService: UserService) { }


  onSubmit() {
    const formData = this.loginForm.value as unknown as Partial<Users>;
    this.userService.loginUser(formData).subscribe(res => {
      if (res.data.existUser?.role === 'user' && res.loginUser) {
        console.log('User as logged in Successfully')
        localStorage.setItem('user', res.loginUser)
        localStorage.removeItem('admin')
        // this.router.navigate(['/search'])
        location.href = "/search";
      } else if (res.data.existUser?.role === 'admin' && res.loginUser) {
        console.log(res)
        console.log('admin as logged in Successfully')
        localStorage.setItem('admin', res.loginUser)
        this.router.navigate(['/dashboard'])
        localStorage.removeItem('user')
      }
      else {
        alert('Not valid user')
      }
    }, (err) => {
      if (err) {
        console.log('Error is ', err)
      }

    })
  }



  ngOnInit(): void {
  }

}
