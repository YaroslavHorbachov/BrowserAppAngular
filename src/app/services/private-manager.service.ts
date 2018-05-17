import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {ManagementService} from './management.service';
import {JsonPDF} from '../options-pdf/jsonPDF.model';

@Injectable()
export class PrivateManagerService {
  listOfUsers: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor(private _h: HttpClient,
              @Inject('HttpOptions') private httpOptions,
              private management: ManagementService) {
  }

  /*REPLACE*/
  setListOfUsers(data) {
    this.listOfUsers.next(data);
  }

  getGeneratedPDF(json: JsonPDF) {
    return this._h.post(API.generatePDF,  json,
      {headers: this.httpOptions.default, responseType: 'blob'});
  }

  giveDetails(id, userList) {
    let name, surname;
    userList.forEach(user => {
      const obj = user[id];
      if (obj) {
        name = obj.fname;
        surname = obj.lname;
      }
      return id;
    });
    return ` ${name}  ${surname}`;
  }

  getListOfUsers() {
    return this.management.getListUsers();
  }

  getManagerEmployees() {
    return this._h.get(API.manager_list, this.httpOptions.default);
  }

  getManagerComments(json) {
    return this._h.post(API.manager_comment_list, json, this.httpOptions.default);
  }

  generateReportTable(doc, table) {
    const headerComments = ['data', 'employee', 'message'];
    const nameRows = table.rows.map(gr => {
      return gr.filter(el => el.innerText);
    });
    nameRows.forEach(pair => {
      if (pair.length > 1) {
        const dTable = doc.autoTableHtmlToJson(pair[1].children[0]);
        doc.autoTable([pair[0]], [], {
          startY: doc.autoTableEndPosY() + 0
        });
        dTable.data.unshift(dTable.columns);
        doc.autoTable(headerComments, dTable.data, {
          startY: doc.autoTableEndPosY() + 0
        });
      } else {
        doc.autoTable([pair[0]], [], {
          startY: doc.autoTableEndPosY() + 0
        });

      }
    });
    doc.save('table.pdf');
  }


}

const API = {
  generatePDF: 'http://localhost:3020/api/generatePDF',
  manager_list: 'http://localhost:3020/api/manager/list',
  manager_comment_list: 'http://localhost:3020/api/manager/comment-list'
};
