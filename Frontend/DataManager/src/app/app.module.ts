import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatInputModule,MatButtonModule,MatFormFieldModule,MatRippleModule, MatTabsModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from'@angular/common/http';

const Approutes : Routes = [
  {path:'home', component:HomeComponent},
  {path:'signup', component:UserComponent,
   children: [{path:'', component:SignUpComponent}]},
   {path:'login', component:UserComponent,
   children: [{path:'', component:SignInComponent}]},
   {path:'**', redirectTo:'/login', pathMatch:'full'}
];
const Modules = [
  MatInputModule,
   BrowserAnimationsModule,
   MatButtonModule,
   MatFormFieldModule,
   MatTabsModule,
   MatInputModule,
   MatRippleModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Approutes, {enableTracing:false}),
    BrowserAnimationsModule,
    Modules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    Modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
