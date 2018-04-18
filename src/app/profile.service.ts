import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  apiRootFileUpdate = 'http://localhost:3020/api/change';
  constructor(private _h: HttpClient) { }
  send(file) {
    return this._h
      .post(this.apiRootFileUpdate, file);
  }

}
