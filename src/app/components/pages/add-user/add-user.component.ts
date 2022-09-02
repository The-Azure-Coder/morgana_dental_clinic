import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/directives/custom.validator';
import { Users } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'username': new FormControl('', [Validators.required]),
    'role': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
    'cpassword': new FormControl('', [Validators.required]),
  },
    { validators: [Validation.match('password', 'cpassword')] }
  )

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    const formData = this.userForm.value as unknown as Partial<Users>;
    if (this.userForm.valid) {
      this.userService.RegisterUser(formData).subscribe({
        next: (res) => {

          Swal.fire('user created');
          this.router.navigate(['/userList']);
        },
        error: () => {
          Swal.fire('Error While Creating a User');
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form submission',
      })
    }
  }


  ngOnInit(): void {
  }

}
