import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TableRenderService {
  private _rerenderTable: Subject<boolean> = new Subject<boolean>();

  set rerenderTable(data: boolean) {
    this._rerenderTable.next(data);
  }

  get rerenderTable() {
    return this._rerenderTable;
  }

}
