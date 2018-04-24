import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

interface IRootLinks<T> {
  TestSessions: T;
  Register: T;
  Login: T;
  LogOut: T;
  Log: T;
  LoginGoogle: T;
}

@Injectable()
export class ConnectServerService {


  constructor(private http: HttpClient, @Inject('HttpOptions') private httpOptions) {
  }

  apiRoot: IRootLinks<string> = {
    TestSessions: 'http://localhost:3020/user/register',
    Register: 'http://localhost:3020/register',
    Login: 'http://localhost:3020/login',
    LogOut: 'http://localhost:3020/logout',
    Log: 'http://localhost:3020/log',
    LoginGoogle: 'http://localhost:3020/login/google'
  };


  getRegister(json) {
    return this.http.post(this.apiRoot.Register, json, this.httpOptions.default);
  }

  getLogin(json) {
    return this.http.post(this.apiRoot.Login, json, this.httpOptions.default);
  }

  authToTrue(data) {
    document.cookie = `isAuth=true&${JSON.stringify(data)};expires=Thu, 01 Jan ${(new Date()).getFullYear() + 1} 00:00:00 UTC;`;
  }

  authToFalse() {
    document.cookie = 'isAuth=false; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }

  authCheck() {
    try {
      const stateSess = document.cookie
        .split(';')
        .map(pair => pair.trim().split('='))
        .filter(pair => pair[0] === 'isAuth')[0][1].split('&');
      if (stateSess[0] === 'true') {
        const dataCatch = JSON.parse(stateSess[1]);
        const name = dataCatch.name;
        const id = dataCatch.id;
        return [true, name];
      } else {
        throw new Error();
      }
    } catch (e) {
      return [false];
    }
  }

  createAdminCookie() {
    document.cookie = 'isAdmin=true; expires=Thu, 01 Jan' + (new Date()).getFullYear() + 1 + ' 00:00:00 UTC;';
  }

  deleteAdminCookie() {
    document.cookie = 'isAdmin=false; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  }

  checkAdminCookie() {
    return document.cookie
      .split(';')
      .map(pair => pair.trim()
        .split('='))
      .filter(pair => pair[0] === 'isAdmin')[0][1] === 'true';
  }

  logOut() {
    return this.http.get(this.apiRoot.LogOut, this.httpOptions.default);
  }

  getLog() {
    return this.http.get(this.apiRoot.Log, this.httpOptions.default);
  }

  authGoogle() {
    return this.http.get(this.apiRoot.LoginGoogle, this.httpOptions.default);
  }
}
