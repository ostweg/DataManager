import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {FormGroup, Validators, FormControl, FormBuilder, EmailValidator, MinLengthValidator} from '@angular/forms';
import {ConfigService} from '../../config.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public registerForm: FormGroup;
  user:UserService;
  
  constructor(public FormBuilder:FormBuilder, public config:ConfigService, public route: Router) { 
    this.registerForm = this.FormBuilder.group({
      Firstname: ['',Validators.required],
      Lastname: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', [Validators.required,  Validators.email]],
      Password: ['',[Validators.required, Validators.minLength(5)]]

    });
    this.user = {
      FirstName:undefined,
      LastName:undefined,
      Rights:undefined,
      Username:undefined,
      Password:undefined,
      Email:undefined,
      
    }
  }

  ngOnInit() {
  }
  RegisterUserData(event:any){
    this.route.navigateByUrl('/home');
    if(this.registerForm.valid){
      this.config.PostData(this.user).subscribe((data: UserService) => {
        this.user = {
          FirstName:undefined,
          LastName:undefined,
          Rights:undefined,
          Username:undefined,
          Password:undefined,
          Email:undefined,
          
        }
      });
      localStorage.setItem('currentuser', JSON.stringify({token:"test", username:this.user.Username}));
    }
  }

}
