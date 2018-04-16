import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {ConnectServerService} from './connect-server.service';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';


const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'register', pathMatch: 'full', component: RegisterComponent
  },
  {
    path: 'login',  pathMatch: 'full', component: LoginComponent,
  },
  {
    path: '**', pathMatch: 'full', component: NotFoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ConnectServerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
