import {Component, OnInit} from '@angular/core';
import {ConnectServerService} from './connect-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuth = false;

  constructor(private register: ConnectServerService) {
  }

  ngOnInit() {
    this.register.getAuth().subscribe((data) => {
      console.log('isAuth was be changed on: ', this.isAuth)
      this.isAuth = data;
    });
  }

  toAuth(boolean) {
    console.log('Change auth to ', this.isAuth);
    this.isAuth = boolean;
  }
}

