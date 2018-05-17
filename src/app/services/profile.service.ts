import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  apiRootUser = 'http://localhost:3020/api/user';
  apiRootUserPassword = 'http://localhost:3020/api/user/password';
  apiRootResetPassword = 'http://localhost:3020/api/user/reset-password';

  constructor(private _h: HttpClient, @Inject('HttpOptions') public options) {
  }

  getUser() {
    return this._h.get(this.apiRootUser, this.options.default);
  }

  updateUser(value) {
    return this._h.post(this.apiRootUser, value, this.options.default);
  }

  checkAndUpdatePassword(json) {
    return this._h.post(this.apiRootUserPassword, json, this.options.default);
  }

  resetPassword(json) {
    return this._h.post(this.apiRootResetPassword, json, this.options.default);
  }

}
