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
  @Output() auth: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private register: ConnectServerService, private router: Router) {
  }


  ngOnInit() {
  }

  submitForm(dataForm) {
    const dataJson = {};
    const controls = dataForm._directives;
    controls.forEach(item => dataJson[item.name] = item.control.value);
    // console.log(dataJson);
    this.register.getLogin(JSON.stringify(dataJson))
      .subscribe(
        (data: IResponseData) => {
          console.log('Confirmed Response', data.state);
          if (data.state === 'done') {
            this.register.getAuth().next(true)
            this.router.navigate(['/']);
          } else {
            this.register.getAuth().next(false)
          }
        },
        (err: IResponseData) => {
          this.auth.emit(false);
          console.log('Client have response error ', err);
        }
      );
  }
}
