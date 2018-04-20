import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ManagementService {

  constructor(private _h: HttpClient) {
  }

  apiRootUserList = 'http://localhost:3020/api/getUserList';
  httpOptions = {
    'Content-Type': 'application/json',
    'withCredentials': true
  };

  getListUsers() {
    return this._h.get(this.apiRootUserList, this.httpOptions);
  }

  getUser() {
  }

  findUser(field) {
  }

  editUser() {
  }

  removeUser() {
  }


}
