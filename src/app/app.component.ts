import {Component, DoCheck, OnInit} from '@angular/core';
import {ConnectServerService} from './connect-server.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  namePerson: string | boolean | void;
  rolePerson = 'employee';
  isAuth: any = [false];


  constructor(private register: ConnectServerService) {
  }

  ngOnInit(): void {
    this.register.getAuthCheck()
      .subscribe((data: any) => {
          if (data) {
            const name = data.fname,
              role = data.role,
              dataSend = {name, role};
            this.register.authToTrue(dataSend);
          }
        },
        (err: any) => console.log('getAuthCheck error ', err));
  }

  ngDoCheck(): void {
    try {
      const resultArray = this.register.authCheck();
      this.isAuth = resultArray[0];
      this.namePerson = resultArray[1];
      this.rolePerson = resultArray[2];
    } catch (e) {
      this.isAuth = [false];
    }
  }

  toAuth(): void {
    this.register.logOut().subscribe((data: any) => {
      console.log(data);
    });
    this.register.authToFalse();
  }
}
