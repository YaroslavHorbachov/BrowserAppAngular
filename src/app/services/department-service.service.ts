import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface IApi<T> {
  departmentEmployees: T;
}

@Injectable()
export class DepartmentService {
  constructor(private _h: HttpClient,
              @Inject('HttpOptions') private httpOptions){}
  base = 'http://localhost:3020';

  private httpRequests: IApi<string> = {
    departmentEmployees: this.base + '/api/department/listEmployee',
    departmentMessages: this.base + '/api/department/listMessages'
  };

  departmentEmployees() {
    return this._h.get(this.httpRequests.departmentEmployees, this.httpOptions.default);
  }
  departmentMessages(){
    return this._h.get(this.httpRequests.departmentMessages, this.httpOptions.default);
  }

}






