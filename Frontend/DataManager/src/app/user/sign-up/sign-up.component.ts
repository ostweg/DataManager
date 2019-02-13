import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {FormGroup, Validators, FormControl, FormBuilder, EmailValidator, MinLengthValidator} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public registerForm: FormGroup;
  user:UserService;
  
  constructor(public FormBuilder:FormBuilder) { 
    this.registerForm = this.FormBuilder.group({
      Firstname: ['',Validators.required],
      Lastname: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.required, Validators.email],
      Password: ['',Validators.required, Validators.minLength(5)]

    });
  }

  ngOnInit() {
  }

}
