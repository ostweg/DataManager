import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  public progress:number;
  public message:string;
  public filename:string;
  private count:number;

  constructor(private http:HttpClient){}
  ngOnInit(){
  }

  upload(files){
    if(files.length === 0)
      return;

    const formData = new FormData();
    this.number = 0;
    this.filename = '';

    for (let file of files){
      formData.append(file.name, file);
      this.number++;
      this.filename = (this.number <= 1) ? file.name : this.number +' files';

    }
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
