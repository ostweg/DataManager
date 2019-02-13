import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginForm:FormGroup;

  constructor( public FormBuilder: FormBuilder) {
    this.loginForm = this.FormBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

}
