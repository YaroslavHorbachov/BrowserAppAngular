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

  setStateData(value) {
    if (value) {
      this.register.authToTrue();
      this.stateData = 'VALID';
    } else {
      this.register.authToFalse();
      this.stateData = 'INVALID';
    }

  }

  submitForm(dataForm): boolean {
    const dataJson = {};
    const controls = dataForm._directives;
    controls.forEach(item => dataJson[item.name] = item.control.value);
    console.log(dataJson);
    if (dataForm.form.status === 'INVALID') {
      this.setStateData(false);
      return false;
    } else {
      this.register.getRegister(JSON.stringify(dataJson))
        .subscribe(
          (data: IResponseData) => {
            console.log(data);
            this.setStateData(true);
            setTimeout(empty => this.router.navigate(['/']), 3000);
          },
          (err) => {
            console.log('Error on client', err);
            this.setStateData(false);
            setTimeout(empty => this.router.navigate(['/']), 5000);
          });
    }

  }
}
