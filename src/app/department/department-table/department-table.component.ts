import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Comment} from '../../models/comment.model';
import {MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../models/user.model';


@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  @Input('employer') employer: User;
  @Input('tableData') tableData: Array<Comment>;
  @Input('baseData') baseData: Array<User>;
  @ViewChild(MatSort) sort: MatSort;
  empty = false;
  listEmployees: MatTableDataSource<Array<Comment>>;
  listEmployeesHead = ['date', 'avatar', 'fullname', 'message'];

  ngOnInit() {
    this.listEmployees = this.tableData && this.format(this.tableData);
  }

  format(table) {
    try {
      const relatedTable = table.filter((comment: Comment) => comment.employee === this.employer._id);
      return relatedTable.length ?
        new MatTableDataSource<Array<Comment>>(relatedTable) :
        (this.empty = true);
    } catch (e) {
      console.log('Something wrong', this.employer);
      return table;
    }

  }

  applyFilter() {
  }


}
