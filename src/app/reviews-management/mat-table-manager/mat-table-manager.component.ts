import {AfterContentInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';

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

  ngOnInit() {
    console.log(this.source);
    this.table = new MatTableDataSource(this.source);
    this.table.sort = this.sort;
    console.log(this.table);
  }

  giveDetails(id) {
    let name, surname;
    this.userList.forEach(user => {
      const obj = user[id];
      if (obj) {
        name = obj.fname;
        surname = obj.lname;
      }
      return false;
    });
    return ` ${name}  ${surname}`;
  }
}
