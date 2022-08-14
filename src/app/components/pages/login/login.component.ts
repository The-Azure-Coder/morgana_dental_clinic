import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',[Validators.required])



  })

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

}
