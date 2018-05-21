import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {User} from '../models/user.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface IApi<T> {
  departmentEmployees: T;
}

@Injectable()
export class DepartmentService {
  private _bReview$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>();

  constructor(private _h: HttpClient,
              @Inject('HttpOptions') private httpOptions) {
  }

  base = 'http://localhost:3020';

  private httpRequests: IApi<string> = {
    departmentEmployees: this.base + '/api/department/listEmployee',
    departmentMessages: this.base + '/api/department/listMessages',
    departmentReviewsList: this.base + '/api/department/listReview',
    departmentReviewsSet: this.base + '/api/department/setReview',
    departmentReviewedEmployees: this.base + '/api/department/listReviewedEmployees'
  };

  departmentEmployees(json) {
    return this._h.post(this.httpRequests.departmentEmployees, json, this.httpOptions.default);
  }

  departmentMessages() {
    return this._h.get(this.httpRequests.departmentMessages, this.httpOptions.default);
  }

  departmentReviewsList() {
    return this._h.get(this.httpRequests.departmentReviewsList, this.httpOptions.default);
  }

  departmentReviewsSet(json) {
    return this._h.post(this.httpRequests.departmentReviewsSet, json, this.httpOptions.default);
  }

  departmentReviewedEmployees(json) {
    return this._h.post(this.httpRequests.departmentReviewedEmployees, json, this.httpOptions.default);
  }

  submitDialog(employee) {
    this._bReview$.next(employee);
  }

  actionsDialog() {
    return this._bReview$;
  }

}






