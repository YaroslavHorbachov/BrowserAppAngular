import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ManagementService {

  constructor(private _h: HttpClient, @Inject('HttpOptions') private httpOptions) {
  }

  apiRootUserList = 'http://localhost:3020/api/getUserList';
  apiRootUpdateUser = 'http://localhost:3020/api/user';
  apiRootRemoveUser = 'http://localhost:3020/api/deleteUser';


  getListUsers() {
    return this._h.get(this.apiRootUserList, this.httpOptions.default);
  }

  getUser() {
  }

  findUser(field) {
  }

  editUser(value) {
    return this._h.post(this.apiRootUpdateUser, value, this.httpOptions.default);
  }

  removeUser(value) {
    return this._h.post(this.apiRootRemoveUser, value, this.httpOptions.default);
  }


}
