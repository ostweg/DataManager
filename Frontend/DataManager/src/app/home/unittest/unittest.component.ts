import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../config.service';
import {UserService} from '../../user.service';
import { Router} from '@angular/router';
import {HttpEventType, HttpRequest,HttpClient} from '@angular/common/http';
import {FileService} from '../../interfaces/File.service';



@Component({
  selector: 'app-unittest',
  templateUrl: './unittest.component.html',
  styleUrls: ['./unittest.component.css']
})
export class UnittestComponent implements OnInit {

  constructor(private config:ConfigService,private Route:Router,private http:HttpClient) { }
  visible: string = '';
  User:UserService;
  IsFound:string;
  IsRegistrated:string;
  IsUploaded:boolean;
  Message:string;
  Progress:number;
  DummyUser:UserService;
  FileName:string;
  FileList:FileService;
  ngOnInit() {


  }
  toggle(ShouldBeVisible){
    if(this.visible === ShouldBeVisible){
      this.visible = '';
    }else{
      this.visible = ShouldBeVisible;
    }
  }
  CheckIfUserExists(){
    this.config.GetUsers().subscribe(data => {
      this.User = data.find(x => x.username=="kek" && x.password=="asdf12345");
      if(this.User == undefined){
        this.IsFound = "User has not been found";
      }
      else {
        this.IsFound = "User has been found";
      }
    })
  }
  RegistrateUser(){

    this.DummyUser = {
      password :"dummy",
      username : "dummy",
      FirstName : "dummy",
      LastName :"dummy",
      Email:"dummydummy.ch",
      rights:"rw"
    };
    var trigger = this.DummyUser.Email,
      regex = new RegExp('[\\w-]+@([\\w-]+\\.)+[\\w-]+'),
      test = regex.test(trigger);

    if(test == false){
      this.IsRegistrated = "User data is not valid";
    }

  }
  LogoutUser(){
    localStorage.removeItem('currentuser');
    this.Route.navigateByUrl('/sigin');
  }
  UploadFile(files){
    if(files.length === 0)
      return;

    const formData = new FormData();
    this.FileName = files.FileName;

    for (let file of files){
      formData.append(file.name, file,);
      console.log(file.fileName);
    }
    const uploadReq = new HttpRequest('POST', 'https://localhost:5001/api/file',formData, {
      reportProgress: true,

    });
    this.IsUploaded = true;

    this.http.request(uploadReq).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.Progress = Math.round(100*event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response){
        this.Message = event.body.toString();
      }
    });
  }


}
