import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/directives/custom.validator';
import { Users } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/user.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  regForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
    'username': new FormControl('', [Validators.required]),
    'cpassword': new FormControl('', [Validators.required]),
  },
    { validators: [Validation.match('password', 'cpassword')] }
  )

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    const formData = this.regForm.value as unknown as Partial<Users>;
    this.userService.RegisterUser(formData).subscribe({
      next: (res) => {
        this.router.navigate(['/login'])
        alert('Registered successfully');
        console.log(res.status);
      },
      error: () => {
        alert('Error While booking the appointment');
      },
    });
  }

  ngOnInit(): void {
  }

}
