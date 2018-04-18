import {Component, DoCheck} from '@angular/core';
import {ConnectServerService} from './connect-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  namePerson: string | boolean | void;
  isAuth: any = [false];


  constructor(private register: ConnectServerService) {
  }

  ngDoCheck() {
    try {
      const resultArray = this.register.authCheck();
      this.isAuth = resultArray[0];
      this.namePerson = resultArray[1];
    } catch (e) {
      this.isAuth = [false];
    }
  }

  toAuth() {
    this.register.authToFalse();
  }
}
