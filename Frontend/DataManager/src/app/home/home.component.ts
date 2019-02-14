import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public route:Router) { }
  CurrentUserName:string;
  ngOnInit() {
    var CurrentUser = JSON.parse(localStorage.getItem('currentuser'));
    this.CurrentUserName = CurrentUser.username;
    console.log(this.CurrentUserName);
  }
  Logout(){
    localStorage.removeItem('currentuser');
    this.route.navigateByUrl('/sigin');
  }

}
