import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../../config.service';
import {UserService} from '../../../user.service';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(public configs: ConfigService) { }
  UserList:Object;


  ngOnInit() {
    this.GetUsers();
  }
  GetUsers() {
    this.configs.GetUsers().subscribe(data1 => {
      this.UserList = data1;
    });
    console.log(this.UserList);
  }

}
