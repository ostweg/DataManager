import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConfigService} from '../../config.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public Route:Router, public Config:ConfigService) { }
  CurrentUserName:string;
  CurrentUserToken:string;
  Status:string;
  User:UserService;
  test:string = "was";
  ngOnInit() {
    var CurrentUser = JSON.parse(localStorage.getItem('currentuser'));
    this.CurrentUserName = CurrentUser.username;
    this.GetUsers();
  }
  Logout(){
    localStorage.removeItem('currentuser');
    this.Route.navigateByUrl('/sigin');
  }
  GetUsers(){
    this.Config.GetUsers().subscribe( data => {
      this.User = data.find(x => x.username == this.CurrentUserName);
     
      if(this.User.rights == "rwd"){
        this.Status = "Admin";
      }else {
        this.Status = "User";
      }
     
    });
    
  }

}
