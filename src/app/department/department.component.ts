import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DepartmentService} from '../services/department-service.service';
import {User} from '../models/user.model';
import {Comment} from '../models/comment.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/observable';
import {mergeMap} from 'rxjs/operator';
import Rx from 'rxjs/Rx';
import {map, mergeMap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {InfiniteScrollEvent, InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {concatAll} from 'rxjs/operators';
import {DialogCheckReviewComponent} from './check-review/dialog-check-review.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild('scroll') scrollable: ElementRef;
  listEmployees: Array<User> = [];
  tableMessages: Array<Comment>;
  allUsers: Array<Object> = [];
  allMessages: Array<Object> = [];
  allReview: Array<Object> = [];
  viewAll: boolean;
  limit = 3;
  skip = 0;

  constructor(private _department: DepartmentService,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog) {
  console.log('Table ', this.tableMessages)
  }

  ngOnInit() {
    this.init();
  }

  onScrollDown(event) {
    this.init();
  }

  public checkBox(employee) {

  }


  private init() {
    this._department.actionsDialog().subscribe(action => {
      console.log('From dialog SUBJECT ', action);
      return action && this._department.departmentReviewsSet(action)
        .mergeMap(() => this._department.departmentReviewsList(), (oVal, data) => data)
        .subscribe(data => {
          // render(data);
          console.log('Reviewed ', data);
        });
    });

    combineLatest(
      this._department.departmentMessages(),
      this._department.departmentReviewsList(),
      this._department.departmentReviewedEmployees({skip: this.skip, limit: this.limit})
    ).subscribe(([messages, reviewed, commented]) => {
      (() => {
        this.allMessages = messages;
      })();
      console.log('Catch DATA', messages, reviewed, commented);
      this.allReview = reviewed;
      this.format([commented, this.allMessages]);
      this.grow();
    });
  }

  public openDialog(employer) {
    this.dialog.open(DialogCheckReviewComponent, {
      minWidth: 700,
      minHeight: 500,
      data: {employer}
    });
  }
  public takeList(){
    this._department.departmentReviewedList().subscribe(console.log);
  }

  private getAllEmployees() {
    return this._department.departmentEmployees();
  }

  private getAllMessages() {
    return this._department.departmentMessages();
  }

  public isReviewed(empl) {
    const check = () => {
      return this.allReview.filter(rev => {
        return String(rev.employee._id) === String(empl._id);
      }).length;
    };
    return this.allReview.length ? check() : null;
  }

  /*.subscribe((res: Array<Object>) => {
        this.grow();
        res.length ? console.log('Commented ', res) : this.getCommentedEmployees();
      }, err => console.log(err));
  */

  private grow() {
    this.skip += 3;
  }


  private baseInclude(mess, base) {
    this.tableMessages = mess.map(m => new Comment({...m, ...{base}}));
  }

  private format([empl, mess]: Observable<Array>) {
    this.listEmployees = [...this.listEmployees, ...empl.map(user => new User(...user))];
    this.baseInclude(mess, this.listEmployees);
  }

  render() {
    this.allReview = data;
    console.log(this.allReview)


    //  TODO REALISE TASK OF RERENDER LIST OF REVIEWED PERSONS , OPEN ALL BUTTON
  }
  public viewAllChange(){
    this._department.departmentEmployees().subscribe(data => console.log())

  }

}

