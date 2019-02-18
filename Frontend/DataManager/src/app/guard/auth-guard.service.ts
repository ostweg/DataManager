import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router:Router) { }

  canActivate():boolean {
    if(!this.auth.IsAuthenticated()) {
      this.router.navigate(['login'])
    }
    return true;
  }
}
