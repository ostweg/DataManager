import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatInputModule,MatButtonModule,MatFormFieldModule,MatRippleModule, MatTabsModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';
import {AuthGuardService as AuthGuard} from './guard/auth-guard.service';
import { AuthService } from './guard/auth.service';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { FileManagerComponent } from './home/file-manager/file-manager.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ManageUserComponent } from './home/manage-user/manage-user.component';
import { UserlistComponent } from './home/manage-user/userlist/userlist.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import { CreateuserComponent } from './home/manage-user/createuser/createuser.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UnittestComponent } from './home/unittest/unittest.component';

const Approutes : Routes = [
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'signup', component:UserComponent,
   children: [{path:'', component:SignUpComponent}]},
   {path:'login', component:UserComponent,
   children: [{path:'', component:SignInComponent}]},
   {path:'**', redirectTo:'/login', pathMatch:'full'}
];
const Modules = [
  MatPaginatorModule,
  MatInputModule,
   BrowserAnimationsModule,
   MatButtonModule,
   MatFormFieldModule,
   MatTabsModule,
   MatInputModule,
   MatRippleModule,
   MatTableModule,
   MatIconModule
];
export function tokenGetters(){
  return localStorage.getItem(JSON.parse(JSON.stringify('currentuser')));
}
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter:tokenGetters
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    FileManagerComponent,
    ProfileComponent,
    ManageUserComponent,
    UserlistComponent,
    CreateuserComponent,
    UnittestComponent,
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Approutes, {enableTracing:false}),
    JwtModule.forRoot(JWT_Module_Options),
    BrowserAnimationsModule,
    Modules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [
    CreateuserComponent
  ],
  exports: [
    Modules,
    CreateuserComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
