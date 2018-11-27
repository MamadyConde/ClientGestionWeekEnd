import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PersonComponent } from './person/person.component';
import { HomeComponent } from './home/home.component';
import { AuthentificationService} from '../service/authentification.Service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {personService} from '../service/personService';
import { NewPersonComponent } from './new-person/new-person.component';
import { DetailPersonComponent } from './detail-person/detail-person.component';
import { LieuComponent } from './lieu/lieu.component';
import { NewLieuComponent } from './new-lieu/new-lieu.component';
import {lieuService} from '../service/lieuService';
import { SportComponent } from './sport/sport.component';
import {sportService} from '../service/sportService';
import { NewSportComponent } from './new-sport/new-sport.component';
import { EditSportComponent } from './edit-sport/edit-sport.component';
import { EditPersonComponent } from './edit-person/edit-person.component';

const appRoutes:Routes =[
  {path:'home',component:HomeComponent},
  {path:'person',component:PersonComponent},
  {path:'login',component:LoginComponent},
  {path:'new-person',component:NewPersonComponent},
  {path:'lieu',component:LieuComponent},
  {path:'new-lieu',component:NewLieuComponent},
  {path:'sport',component:SportComponent},
  {path:'new-sport',component:NewSportComponent},
  {path:'editSport/:id',component:EditSportComponent},
  {path:'detailPerson/:id',component:DetailPersonComponent},
  {path:'editPerson/:id',component:EditPersonComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PersonComponent,
    HomeComponent,
    NewPersonComponent,
    DetailPersonComponent,
    LieuComponent,
    NewLieuComponent,
    SportComponent,
    NewSportComponent,
    EditSportComponent,
    EditPersonComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [AuthentificationService,personService,lieuService,sportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
