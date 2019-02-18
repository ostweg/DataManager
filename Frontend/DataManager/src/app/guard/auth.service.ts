import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public IsAuthenticated(): boolean {
    const token = localStorage.getItem('currentuser');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
