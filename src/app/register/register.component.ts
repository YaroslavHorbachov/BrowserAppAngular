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
    this.register.getAuth().next(value);
    if (value) {
      this.stateData = 'VALID';
    } else {
      this.stateData = 'INVALID';
    }

  }

  submitForm(dataForm): void {
    const dataJson = {};
    const controls = dataForm._directives;
    controls.forEach(item => dataJson[item.name] = item.control.value);
    console.log(dataJson);
    this.register.getRegister(JSON.stringify(dataJson))
      .subscribe(
        (data: IResponseData) => {
          console.log(data);
          data.state === 'done' ? this.setStateData(true) : this.setStateData(false);
          setTimeout(empty => this.router.navigate(['/']), 3000);
        },
        (err) => {
          setTimeout(empty => this.router.navigate(['/']), 5000);
          console.log('Error on client', err);
        });
  }
}
