import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {ConnectServerService} from '../connect-server.service';
import {IResponseData} from '../iresponse-data';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  paramsEmail: string = null;
  errmsg: string = null;
  cred: any = {};

  constructor(
    private register: ConnectServerService,
    private router: Router,
    private queryRouter: ActivatedRoute,
    public snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      verticalPosition: 'bottom',
      announcementMessage: message
    });
  }

  ngOnInit() {
    if (this.queryRouter.snapshot.params) {
      this.paramsEmail = this.queryRouter.snapshot.params.email.replace(',', '.');
      console.log(this.queryRouter.snapshot.params);
      if (this.paramsEmail) {
        this.register
          .getUserEmailCheck({email: this.paramsEmail.replace(',', '.')})
          .subscribe((data: any) => {
            console.log(data);
            if (data.status === 'done') {
              this.cred.name = data.name;
              this.cred.surname = data.surname;
              this.openSnackBar(
                `Great ! ${data.data.fname} ${data.data.lname}. You are welcome! `,
                'OK');
            }
          });
      }
    }
  }

  submitForm(dataForm) {

    console.log(dataForm.value);
    const dataJson = {};
    const controls = dataForm._directives;
    controls.forEach(item => dataJson[item.name] = item.control.value);
    console.log(dataJson);
    this.register.getLogin(dataForm.value)
      .subscribe(
        (data: any) => {
          const dataSend = {name: data.fname, role: data.role};
          this.register.authToTrue(dataSend);
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        (err: any) => {
          if (err) {
            this.errmsg = err.statusText;
            setTimeout(() => this.errmsg = null, 2000);
            this.register.authToFalse();
            console.log('Client have response error ', err);
          }
        }
      );
  }

  authGoogle() {
    console.log('Google');
    const link = 'http://localhost:3020/login/google';
    (<any>document).location = link;
  }

  authFacebook() {
    console.log('Facebook');
    const link = 'http://localhost:3020/login/facebook';
    (<any>document).location = link;
  }
}
