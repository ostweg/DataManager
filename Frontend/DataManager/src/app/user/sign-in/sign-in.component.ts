import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';
import {ConfigService} from '../../config.service';
import { UserService } from 'src/app/user.service';
import {Router} from '@angular/router';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginForm:FormGroup;
  Users:UserService[];
  UserNameMatches:boolean;
  UserPasswordMatches:boolean;

  constructor( public FormBuilder: FormBuilder, public Config: ConfigService, public Route: Router) {
    this.loginForm = this.FormBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.GetUsers();
  }
  GetUsers(){
    this.Config.GetUsers().subscribe(data => {
      this.Users = data;
    })
  }
  CheckIfUserMatches(Username:string, Password:string){
   
   const UserNameMatches = this.Users.filter(user => user.Username == Username);
   const UserPasswordMatches = this.Users.filter(userpw => userpw.Password == Password);

   if(UserNameMatches && UserPasswordMatches){
    localStorage.setItem('currentuser', JSON.stringify({token:Token, username:Username}));
    this.Route.navigateByUrl('/home');
   }
    
  
  }

}
