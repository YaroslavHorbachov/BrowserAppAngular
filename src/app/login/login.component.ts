import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ConnectServerService} from '../connect-server.service';
import {IResponseData} from '../iresponse-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private register: ConnectServerService, private router: Router) {
  }

  ngOnInit() {
  }

  submitForm(dataForm) {
    const dataJson = {};
    const controls = dataForm._directives;
    controls.forEach(item => dataJson[item.name] = item.control.value);
    this.register.getLogin(JSON.stringify(dataJson))
      .subscribe(
        (data: any) => {
          this.register.authToTrue(data.fname);
          setTimeout(empty => this.router.navigate(['/']), 5000);
        },
        (err) => {
          this.register.authToFalse();
          console.log('Client have response error ', err);
        }
      );
  }
}
