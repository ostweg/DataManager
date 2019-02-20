import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {FormGroup, Validators, FormControl, FormBuilder, EmailValidator, MinLengthValidator, AbstractControl} from '@angular/forms';
import {ConfigService} from '../../config.service';
import {Router} from '@angular/router';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public registerForm: FormGroup;
  user:UserService;
  Users:UserService[];
  
  constructor(public FormBuilder:FormBuilder, public config:ConfigService, public route: Router) { 
    this.registerForm = this.FormBuilder.group({
      Firstname: ['',Validators.required],
      Lastname: ['', Validators.required],
      Organisation: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', [Validators.required,  Validators.email]],
      Password: ['',[Validators.required, Validators.minLength(5)]]

    });
    this.user = {
      FirstName:undefined,
      LastName:undefined,
      Rights:"rwd",
      organisationName:undefined,
      username:undefined,
      password:undefined,
      Email:undefined,
      
    }
  }

  ngOnInit() {
  }
  GetUsers(){
    this.config.GetUsers().subscribe( data => {
      this.Users = data;
    })
  }
  


  RegisterUserData(event:any){
    if(this.registerForm.valid){
      this.config.PostData(this.user).subscribe((data: UserService) => {
        this.user = {
          FirstName:undefined,
          LastName:undefined,
          Rights:"rwd",
          organisationName:undefined,
          username:undefined,
          password:undefined,
          Email:undefined,
          
        }
      });
    }
    //localStorage.setItem('currentuser',JSON.stringify(username:this.user.username.toString()));
    this.route.navigateByUrl('/signin');
  }

}
