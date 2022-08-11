import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/directives/custom.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  
  regForm = new FormGroup({
    'email': new FormControl('',[Validators.required,Validators.email]),
    'password': new FormControl('',[Validators.required]),
    'cpassword': new FormControl('', [Validators.required]),
  },
    { validators: [Validation.match('password', 'cpassword')] }
  )

  constructor() { }

  ngOnInit(): void {
  }

}
