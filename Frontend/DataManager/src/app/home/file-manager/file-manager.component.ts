import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {observable, Observable, Subject} from 'rxjs';
import {UserService} from '../../user.service';
import {ConfigService} from '../../config.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  public progress:number;
  public message:string;
  CurrentUserName:string;
  UserId:number;

  constructor(private http:HttpClient, private configs: ConfigService){}

  ngOnInit(){
    var token = JSON.parse(localStorage.getItem('currentuser'));
    this.CurrentUserName = token.username;
    this.Getuser();
    this.GetUserId();
  }
  Getuser():Observable<UserService>{
    let subject: Subject<UserService> = new Subject();
    this.configs.GetUsers().subscribe(data1 => {
      subject.next(data1.find(x => x.username == this.CurrentUserName));
    });
    return subject.asObservable();

  }
  GetUserId(){
    this.Getuser().subscribe((data)=> {
      this.UserId = data.personId;
    });
  }
  upload(files){
    if(files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files){
      formData.append(file.name, file,);
    }
    formData.append('currentId',this.UserId.toString());


    const uploadReq = new HttpRequest('POST', 'https://localhost:5001/api/file',formData, {
      reportProgress: true,

    });

    this.http.request(uploadReq).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100*event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response){
        this.message = event.body.toString();
      }
    });

  }

}
