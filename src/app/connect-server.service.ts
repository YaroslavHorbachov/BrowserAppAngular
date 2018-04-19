import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ConnectServerService {


  constructor(private http: HttpClient) {
  }

  apiRootRegister = 'http://localhost:3020/register';
  apiRootLogin = 'http://localhost:3020/login';
  apiRootLog = 'http://localhost:3020/log';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    }),
  };


  getRegister(json) {
    return this.http.post(this.apiRootRegister, json, this.httpOptions);
  }

  getLogin(json) {
    return this.http.post(this.apiRootLogin, json, this.httpOptions);
  }

  authToTrue(data) {
    document.cookie = `isAuth=true&${JSON.stringify(data)}; expires=Thu, 01 Jan' + (new Date()).getFullYear() + 1 + ' 00:00:00 UTC;`;
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
      .map(pair => pair.trim().split('=')).filter(pair => pair[0] === 'isAdmin')[0][1] === 'true';
  }

  getLog() {
    return this.http.get(this.apiRootLog, this.httpOptions);
  }

}
