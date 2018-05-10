import {AfterContentInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';

@Component({
  selector: 'app-mat-table-manager',
  templateUrl: './mat-table-manager.component.html',
  styleUrls: ['./mat-table-manager.component.css']
})
export class MatTableManagerComponent implements  OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @Input('source') source;
  listUserHead: Array<string> = ['date', 'employeer', 'text'];
  table: MatTableDataSource<Array<Object>> = null;

  constructor() {
  }


  ngOnInit() {
    console.log(this.source)
    this.table = new MatTableDataSource(this.source);
    this.table.sort = this.sort;
    console.log(this.table);
  }


}
