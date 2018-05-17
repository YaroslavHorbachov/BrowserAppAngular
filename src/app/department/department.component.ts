import {Component, OnInit} from '@angular/core';
import {DepartmentService} from '../services/department-service.service';
import {User} from '../models/user.model';
import {Comment} from '../models/comment.model';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';
import 'rxjs/observable';
import {mergeMap} from 'rxjs/operator';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  listEmployees: Array<User>;
  tableMessages: Array<Comment>;
  viewAll: boolean;

  constructor(private _department: DepartmentService) {
  }

  ngOnInit() {
    this.init();

  }

  init() {
    this._department.departmentEmployees()
      .mergeMap(
        () => this._department.departmentMessages(),
        (pre, curr) => [pre, curr])
      .subscribe((data: Array<Array>) => {
        this.format(data);
      });
  }

  format([empl, mess]: Observable<Array>) {
    this.listEmployees = empl.map(user => new User(...user));
    this.tableMessages = mess.map(m => new Comment(...m));
    console.log(this.listEmployees, this.tableMessages);
  }


}

