import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Comment} from '../../models/comment.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../models/user.model';


@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  @Input('tableData') tableData: Array<Comment>;
  @Input('baseData') baseData: Array<User>;
  @ViewChild(MatSort) sort: MatSort;
  listEmployees: MatTableDataSource<Array<Comment>>;
  listEmployeesHead = ['date', 'avatar', 'fullname', 'message'];

  ngOnInit() {

    this.baseData &&
      this.tableData &&
      this.tableData.forEach(comment => comment.base = this.baseData)
      this.listEmployees = new MatTableDataSource<Array<Comment>>(this.tableData);
    console.log(this.listEmployees)
  }

  applyFilter() {
  }



}
