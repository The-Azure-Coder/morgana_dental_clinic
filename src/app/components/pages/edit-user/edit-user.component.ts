import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user!: Users;
  userForm!: FormGroup;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  updateUser() {
    this.userService.updateUser(this.user._id, this.userForm.value).subscribe(() => {
      this.router.navigate(['/userList'])
    })
  }

  ngOnInit(): void {
    this.userService
      .getUserById(this.route.snapshot.params['id'])
      .subscribe((results) => {
        this.user = results.data;
        this.userForm = new FormGroup({
          username: new FormControl(results.data.username, [
            Validators.required,
          ]),
          email: new FormControl(results.data.email, [Validators.required]),
          role: new FormControl(results.data.role, [
            Validators.required,
          ]),


        });
      });
  }
}