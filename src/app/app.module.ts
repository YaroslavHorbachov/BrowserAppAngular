import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConnectServerService} from './connect-server.service';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ProfileComponent} from './profile/profile.component';
import {ProfileService} from './profile.service';


const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'register', pathMatch: 'full', component: RegisterComponent
  },
  {
    path: 'login', pathMatch: 'full', component: LoginComponent
  },
  {
    path: 'profile', pathMatch: 'full', component: ProfileComponent
  },
  {
    path: '**', pathMatch: 'full', component: NotFoundComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ConnectServerService,
    ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
