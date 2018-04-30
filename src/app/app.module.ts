import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ValueProvider} from '@angular/core';


import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConnectServerService} from './connect-server.service';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule, UrlSegment} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ProfileComponent} from './profile/profile.component';
import {ProfileService} from './profile.service';
import {FileUploadModule} from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';
import {DialogEditComponent, ManagementComponent} from './management/management.component';
import {ManagementService} from './management.service';
import * as HTTP_OPTIONS from './config.options';
import {UserReviewsComponent} from './user-reviews/user-reviews.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {MatNativeDateModule} from '@angular/material';
import {DialogAddReviewComponent} from './dialog-add-review/dialog-add-review.component';
import {DialogViewReviewComponent} from './dialog-view-review/dialog-view-review.component';


const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', component: HomeComponent
  },
  {
    path: 'register', pathMatch: 'full', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login/:email', component: LoginComponent
  },
  {
    path: 'profile', pathMatch: 'full', component: ProfileComponent
  },
  {
    path: 'user-management', pathMatch: 'full', component: ManagementComponent
  },
  {
    path: 'reviews', pathMatch: 'full', component: ReviewsComponent
  },
  {
    component: UserReviewsComponent, matcher: reviewsId
  },
  {
    path: '**', pathMatch: 'full', component: NotFoundComponent
  }
];

const HTTP: ValueProvider = {provide: 'HttpOptions', useValue: HTTP_OPTIONS};

export function reviewsId(url: UrlSegment[]) {
  return url[0].path.match(/^(\w+)-reviews/) ? {consumed: url} : null;
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    ProfileComponent,
    ManagementComponent,
    DialogEditComponent,
    UserReviewsComponent,
    ReviewsComponent,
    DialogAddReviewComponent,
    DialogViewReviewComponent
  ],
  imports: [
    MatNativeDateModule,
    FileUploadModule,
    CalendarModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ConnectServerService,
    ProfileService,
    ManagementService,
    HTTP
  ],
  entryComponents: [
    DialogViewReviewComponent,
    DialogEditComponent,
    DialogAddReviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
