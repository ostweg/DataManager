import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = 'http://localhost:5000/api/user';
  private urlForAuth = 'https://localhost:5001/persons/authenticate';

  constructor(private HttpClient:HttpClient) { 

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
 
}
