import {Component, DoCheck, OnInit} from '@angular/core';
import {ConnectServerService} from './connect-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  namePerson: string | boolean | void;
  isAuth: any = [false];


  constructor(private register: ConnectServerService) {
  }

  ngOnInit() {
    this.register.getAuthCheck()
      .subscribe(data => {
          if (data) {
            console.log(data);
          }
        },
        err => console.log('getAuthCheck ', err));
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
    this.register.logOut().subscribe((data: any) => {
      console.log(data);
    });
    this.register.authToFalse();
  }
}
