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
    console.log(dataForm.value);
    const dataJson = {};
    const controls = dataForm._directives;
    controls.forEach(item => dataJson[item.name] = item.control.value);
    console.log(dataJson);
    this.register.getLogin(dataForm.value)
      .subscribe(
        (data: any) => {
          console.log('Here dta', data);

          const dataSend = {name: data.fname, id: data.id};

          this.register.authToTrue(dataSend);

          setTimeout(empty => this.router.navigate(['/']), 2000);

        },
        (err) => {
          this.register.authToFalse();
          console.log('Client have response error ', err);
        }
      );
  }
}
