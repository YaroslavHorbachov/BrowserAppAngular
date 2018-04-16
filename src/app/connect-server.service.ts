import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ConnectServerService {
  Auth: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  apiRootRegister = 'http://localhost:3020/register';
  apiRootLogin = 'http://localhost:3020/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getRegister(json) {
    return this.http.post(this.apiRootRegister, json, this.httpOptions);
  }

  getLogin(json) {
    return this.http.post(this.apiRootLogin, json, this.httpOptions);
  }

  getAuth() {
    return this.Auth;
  }

}
