import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DepartmentService} from '../services/department-service.service';
import {User} from '../models/user.model';
import {Comment} from '../models/comment.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/observable';
import {mergeMap} from 'rxjs/operator';
import {Subject} from 'rxjs/Subject';
import {InfiniteScrollEvent, InfiniteScrollDirective} from 'ngx-infinite-scroll';



@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild('scroll') scrollable: ElementRef;
  listEmployees: Array<User> = [];
  tableMessages: Array<Comment>;
  viewAll: boolean;
  baseArray: Array<any> = [];
  protocol: Subject = new Subject();
  constructor(private _department: DepartmentService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.init();
    this.protocol.subscribe(() => {
      console.log('Via replay subject ', this.baseArray);
    });

  }



  onScrollDown(event) {
    console.log('Scroll ', event );
    this.init();

  }

  public checkBox(employee) {

  }

  private init() {
    this._department.departmentEmployees()
      .mergeMap(
        () => this._department.departmentMessages(),
        (pre, curr) => [pre, curr])
      .subscribe((data: Array<Array>) => {
        this.format(data);
      });
  }

  private baseInclude(mess, base) {
    this.tableMessages = mess.map(m => new Comment({...m, ...{base}}));
  }

  private format([empl, mess]: Observable<Array>) {
    console.log('Employee ', empl);
    this.listEmployees = [...this.listEmployees, ...empl.map(user => new User(...user))];
    console.log('DIF', this.listEmployees)
    this._department.replayList = this.listEmployees;
    this._department.replayList.subscribe(base => {
      this.protocol.next(this.baseArray.push(base));
      return this.baseInclude(mess, base);
    });
    console.log('Employees and Table messages ', this.listEmployees, this.tableMessages);
  }

  render() {

  }

}

