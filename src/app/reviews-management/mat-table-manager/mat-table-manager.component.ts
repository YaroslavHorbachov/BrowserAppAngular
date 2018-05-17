import {AfterContentInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';
import {PrivateManagerService} from '../../services/private-manager.service';

@Component({
  selector: 'app-mat-table-manager',
  templateUrl: './mat-table-manager.component.html',
  styleUrls: ['./mat-table-manager.component.css']
})
export class MatTableManagerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Input('source') source;
  @Input('user') userList;
  listUserHead: Array<string> = ['date', 'employee', 'message'];
  table: MatTableDataSource<Array<Object>> = null;

  constructor(private _pmanager: PrivateManagerService) {
  }

  ngOnInit() {
    this.table = new MatTableDataSource(this.source);
    this.table.sort = this.sort;
  }

  giveDetails(id) {
    return this._pmanager.giveDetails(id, this.userList);
  }
}
