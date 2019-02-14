import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = 'http://localhost:5000/api/user';

  constructor(private HttpClient:HttpClient) { 

  }
  PostData(object:UserService):Observable<UserService>{

    return this.HttpClient.post<UserService>(`${this.url}`,object);
  }
}
