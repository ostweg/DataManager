import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilebrowserComponent } from './filebrowser/filebrowser.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'filebrowser', component:FilebrowserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FilebrowserComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
