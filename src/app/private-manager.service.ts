import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {ManagementService} from './management.service';

@Injectable()
export class PrivateManagerService {
  listOfUsers: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor(private _h: HttpClient,
              @Inject('HttpOptions') private httpOptions,
              private management: ManagementService) {
  }

  /*REPLACE*/setListOfUsers(data) {
    this.listOfUsers.next(data);
  }

  getListOfUsers() {
    return this.management.getListUsers()
  }

  getManagerEmployees() {
    return this._h.get(API.manager_list, this.httpOptions.default);
  }

  getManagerComments(json) {
    return this._h.post(API.manager_comment_list, json, this.httpOptions.default);
  }

}

const API = {
  manager_list: 'http://localhost:3020/api/manager/list',
  manager_comment_list: 'http://localhost:3020/api/manager/comment-list'
};
