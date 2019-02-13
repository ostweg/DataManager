import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatInputModule,MatButtonModule,MatFormFieldModule,MatRippleModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const Approutes : Routes = [
 
  {path:'login', component:LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'**', component:HomeComponent}
];
const Modules = [
  MatInputModule,
   BrowserAnimationsModule,
   MatButtonModule,
   MatFormFieldModule,
   MatInputModule,
   MatRippleModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Approutes, {enableTracing:false}),
    BrowserAnimationsModule,
    Modules
  ],
  exports: [
    Modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
