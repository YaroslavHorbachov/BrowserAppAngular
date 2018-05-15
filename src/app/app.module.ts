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
import { DialogResetpasswordComponent } from './dialog-resetpassword/dialog-resetpassword.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SettingsComponent } from './settings/settings.component';
import { ReviewsManagementComponent } from './reviews-management/reviews-management.component';
import {PrivateManagerService} from './private-manager.service';
import { ReviewsManagerComponent } from './reviews-manager/reviews-manager.component';
import { MatTableManagerComponent } from './reviews-management/mat-table-manager/mat-table-manager.component';
import { ReportComponentComponent } from './report-component/report-component.component';
import {DragulaModule} from 'ng2-dragula';
import { OptionsPdfComponent } from './options-pdf/options-pdf.component';


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
    path: 'login/:email', pathMatch: 'full',  component: LoginComponent
  },
  {
    path: 'profile', pathMatch: 'full', component: ProfileComponent
  },
  {
    path: 'user-management', pathMatch: 'full', component: ManagementComponent
  },
  {
    path: 'reviews-management', pathMatch: 'full', component: ReviewsManagementComponent
  },
  {
    path: 'reviews', pathMatch: 'full', component: ReviewsComponent
  },
  {
    path: 'reviews-manager', pathMatch: 'full', component: ReviewsManagerComponent
  },
  {
    path: 'settings', pathMatch: 'full', component: SettingsComponent
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
    DialogViewReviewComponent,
    DialogResetpasswordComponent,
    SnackbarComponent,
    SettingsComponent,
    ReviewsManagementComponent,
    ReviewsManagerComponent,
    MatTableManagerComponent,
    ReportComponentComponent,
    OptionsPdfComponent
  ],
  imports: [
    DragulaModule,
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
    PrivateManagerService,
    ConnectServerService,
    ProfileService,
    ManagementService,
    HTTP
  ],
  entryComponents: [
    SnackbarComponent,
    DialogResetpasswordComponent,
    DialogViewReviewComponent,
    DialogEditComponent,
    DialogAddReviewComponent,
    ReportComponentComponent,
    OptionsPdfComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
