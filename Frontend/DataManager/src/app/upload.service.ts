import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UploadService {

  url:string = 'https://localhost:5001/api/file';

  constructor(private httpClient:HttpClient) {
   
   }
  
   }
   

  


