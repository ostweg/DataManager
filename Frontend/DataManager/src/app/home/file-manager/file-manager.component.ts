import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../config.service';
import {FileService} from '../../interfaces/File.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  SelectedFile:File;
  File:File;
  Files:FileService;
  ProfileForm:FormGroup;
  constructor(private config:ConfigService, private fb:FormBuilder) {
    this.Files = {
      name:undefined,
      lastModified:undefined,
      Type:undefined,
      Size:undefined
    }
   }

  ngOnInit() {
  }
  FileSelect(event){
    this.SelectedFile = event.target.files[0];
  }
  UploadFile(){
    console.log(this.SelectedFile)
    this.config.PostFile(this.SelectedFile).subscribe( data => {
      /*this.File = {
        name:data.name,
        lastModified:data.lastModified,
        type:data.type,
        size:data.size
      };*/
    });
    
  }
  

}
