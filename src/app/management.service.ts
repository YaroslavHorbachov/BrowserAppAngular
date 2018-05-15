import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const opt = {
  'Content-Type': 'application/json',
  'withCredentials': true
};

@Injectable()
export class ManagementService {
  renderTableReviews: Subject<any> = new Subject<any>();
  listComentedUsers: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(['']);

  constructor(private _h: HttpClient, @Inject('HttpOptions') private httpOptions) {
  }

  apiRootMessageHistory = 'http://localhost:3020/api/message/history';
  apiRootUserList = 'http://localhost:3020/api/getUserList';
  apiRootUpdateUser = 'http://localhost:3020/api/user';
  apiRootRemoveUser = 'http://localhost:3020/api/deleteUser';
  apiRootGetLeadsList = 'http://localhost:3020/api/getLeads';
  apiRootGetEmployeesList = 'http://localhost:3020/api/getEmployees';
  apiRootGetMessagesList = 'http://localhost:3020/api/getMessages';
  apiRootPostMessage = 'http://localhost:3020/api/sendMessage';

  setListCommentedUsers(list) {
    console.log('Take list ', list);
    this.listComentedUsers.next([...list]);
  }

  getListCommentedUsers() {
    return this.listComentedUsers;
  }

  getListUsers() {
    return this._h.get(this.apiRootUserList,  opt);
  }

  getEmployeeList() {
    return this._h.get(this.apiRootGetEmployeesList, this.httpOptions.default);
  }

  getLeads() {
    return this._h.get(this.apiRootGetLeadsList, this.httpOptions.default);
  }

  getMessageHistory() {
    return this._h.get(this.apiRootMessageHistory, this.httpOptions.default);
  }

  editUser(value) {
    return this._h.post(this.apiRootUpdateUser, value, this.httpOptions.default);
  }

  removeUser(value) {
    return this._h.post(this.apiRootRemoveUser, value, this.httpOptions.default);
  }

  getMessagesList() {
    return this._h.get(this.apiRootGetMessagesList, this.httpOptions.default);
  }

  sendMessage(value) {
    return this._h.post(this.apiRootPostMessage, value, this.httpOptions.default);
  }

}
