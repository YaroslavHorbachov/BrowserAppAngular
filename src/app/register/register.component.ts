import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConnectServerService} from '../connect-server.service';
import {Router} from '@angular/router';
import {IResponseData} from '../iresponse-data';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() auth: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private register: ConnectServerService, private router: Router) {
  }

  stateData: any = false;

  ngOnInit() {
  }

  setStateData(value, name?) {
    if (value) {
      this.register.authToTrue(name);
      this.stateData = 'VALID';
    } else {
      this.register.authToFalse();
      this.stateData = 'INVALID';
    }

  }

  submitForm(dataForm): boolean {
    const dataJson:  any = {};
    const controls = dataForm._directives;
    controls.forEach(item => dataJson[item.name] = item.control.value);
    console.log('JSON ', dataJson);
    if (dataForm.form.status === 'INVALID' || dataJson.password !== dataJson.password2) {

      this.setStateData(false);
      return false;
    } else {
      this.register.getRegister(JSON.stringify(dataJson))
        .subscribe(
          (data: any) => {
            console.log('Here create new user', data);
            if (data.state === 'done') {
              this.setStateData(true, data.fname);
              setTimeout(empty => this.router.navigate(['/']), 3000);
            } else {
              this.setStateData(false);
            }

          },
          (err) => {
            console.log('Error on client', err);

            this.setStateData(false);
            setTimeout(empty => this.router.navigate(['/']), 3000);
          });
    }

  }
}

export class IdataJson {
  fname: string;
  lname: string;
  email: string;
  password: string;
  password2: string;
}
