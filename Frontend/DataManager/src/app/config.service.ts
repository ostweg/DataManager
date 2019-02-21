import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {FileService} from './interfaces/File.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = 'http://localhost:5000/api/user';
  private urlForAuth = 'https://localhost:5001/persons/authenticate';
  private urlFile = 'https://localhost:5001/api/file';
  constructor(private HttpClient:HttpClient) { 

  }
  PostFile(object:File){
    return this.HttpClient.post<File>(`${this.urlFile}`,object);
  }
  PostData(object:UserService):Observable<UserService>{

    return this.HttpClient.post<UserService>(`${this.url}`,object);
  }
  GetUsers():Observable<UserService[]>{
    return this.HttpClient.get<UserService[]>(`${this.url}`);
  }
  PostPerson(object:UserService):Observable<UserService>{
    return this.HttpClient.post<UserService>(`${this.urlForAuth}`,object);
  }
  DeleteUser(object:any):Observable<any>{
    return this.HttpClient.delete<any>(`${this.url}/${object.personId}`);
  }
  GlobalData(){
    this.GetUsers();
  }
 
}
