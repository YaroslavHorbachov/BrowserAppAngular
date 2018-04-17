import {Component, DoCheck} from '@angular/core';
import {ConnectServerService} from './connect-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  valueActive = false;
  isAuth = false;
  navLinks: Array<Object> = [{
    path: '',
    label: 'Home'
  }, {
    path: '/login',
    label: 'Login'
  }, {
    path: '/register',
    label: 'Register'
  }, {
    path: '/',
    label: 'Log Out'
  }, {
    path: '/tima',
    label: 'To Not Found'
  }];


  constructor(private register: ConnectServerService) {
  }

  activate() {
    this.valueActive = !this.valueActive;
  }
  ngDoCheck() {
    try {
      this.isAuth = this.register.authCheck();
    } catch (e) {
      this.isAuth = false;
    }
  }

  toAuth() {
    this.register.authToFalse();
    console.log('Change auth to ', this.isAuth);
  }
}

