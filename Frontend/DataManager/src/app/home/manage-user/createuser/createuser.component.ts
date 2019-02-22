import { Component, OnInit} from '@angular/core';
import {UserService} from '../../../user.service';
import {FormGroup, Validators, FormControl, FormBuilder, EmailValidator, MinLengthValidator, AbstractControl} from '@angular/forms';
import {ConfigService} from '../../../config.service';
import {Router} from '@angular/router';
import { Token } from '@angular/compiler';
import {MatDialogRef} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {UserlistComponent} from '../userlist/userlist.component';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  public registerForm: FormGroup;
  user:UserService;
  Users:UserService;
  OrgName:string;
  CurrentUserName:string;
  Disabled:boolean;
  Get:UserlistComponent;

  
  constructor(public FormBuilder:FormBuilder, public config:ConfigService, public route: Router, public dialog:MatDialogRef<CreateuserComponent>) { 
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
      rights:"rw",
      organisationName:undefined,
      username:undefined,
      password:undefined,
      Email:undefined,
      
    }
  }

  ngOnInit() {
    var tokenUser = JSON.parse(localStorage.getItem('currentuser'));
    this.CurrentUserName = tokenUser.username;
    this.GetUsers();
  }
  GetUsers():Observable<UserService>{
      let subject: Subject<UserService> = new Subject();  

      this.config.GetUsers().subscribe( data => {
//        this.Users = data.find(x => x.username == this.CurrentUserName);
        subject.next(data.find(x => x.username == this.CurrentUserName));
      });
      return subject.asObservable(); 
  }
  
  PostUser(org:any){
    this.user.organisationName = org;
    this.config.PostData(this.user).subscribe((data: UserService) => {
      this.user = {
        FirstName:undefined,
        LastName:undefined,
        rights:"rw",
        organisationName: <any>org,
        username:undefined,
        password:undefined,
        Email:undefined,
      }
      console.log("orgname"+ org);
    });
  }

  RegisterUserData(event:any){
    if(this.registerForm.valid){
      this.GetUsers().subscribe((user1)=>{
        this.PostUser(user1.organisationName);
      })
      
    }
    this.onClose();
    
  }
  onClose(){
    this.dialog.close();
  }

}
