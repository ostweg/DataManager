import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  
  constructor(public auth: AuthService, public router:Router) { }

  canActivate():boolean {
    const user = JSON.parse(localStorage.getItem('currentuser'));
    if(user.username == null) {
      this.router.navigateByUrl('/login');
    }
    return true;
  }
}
