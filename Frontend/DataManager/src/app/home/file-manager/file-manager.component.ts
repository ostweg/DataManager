import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {observable, Observable, Subject} from 'rxjs';
import {UserService} from '../../user.service';
import {ConfigService} from '../../config.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FileService} from '../../interfaces/File.service';
import {MatSnackBar} from '@angular/material';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild('paginator') paginator:MatPaginator;
  public dataSource: MatTableDataSource<any>;
  public progress:number;
  public message:string;
  CurrentUserName:string;
  UserId:number;
  UserOrganisation:string;
  FileList:FileService[];

  constructor(private http:HttpClient, private configs: ConfigService, private snack:MatSnackBar){}

  ngOnInit(){
    var token = JSON.parse(localStorage.getItem('currentuser'));
    this.CurrentUserName = token.username;
    this.GetUser();
    this.GetUserOrganisation();
    this.GetUserId();
    this.GetFiles();


  }
  GetUser():Observable<UserService>{
    let subject: Subject<UserService> = new Subject();
    this.configs.GetUsers().subscribe(data1 => {
      subject.next(data1.find(x => x.username == this.CurrentUserName));
    });

    return subject.asObservable();

  }
  SaveFile($key:any){
    console.log($key.filePath);
    saveAs($key.filePath);
  }
  GetUserId(){
    this.GetUser().subscribe((data)=> {
      this.UserId = data.personId;
    });
  }
  GetUserOrganisation(){
    this.GetUser().subscribe((data1)=>{
      this.UserOrganisation = data1.organisationName;
    })
  }

  upload(files){
    if(files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files){
      formData.append(file.name, file,);
    }
    formData.append('currentId',this.UserId.toString());
    formData.append('currentOrg', this.UserOrganisation);


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
  OnDelete($key:any){
    this.configs.DeleteFile($key).subscribe(dat => {
      this.configs.GlobalData();
      this.GetFiles();
      this.snack.open(`File Delete`, "!", {duration:2000})
    });
  }
  GetFiles(){

    var token = JSON.parse(localStorage.getItem('currentOrgName'));
    this.configs.GetFiles().subscribe(data => {
      this.FileList = data.filter(x => x.personOrg == token.orgname);
      this.dataSource = new MatTableDataSource(this.FileList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['fileId','personId','fileName','actions'];
}
