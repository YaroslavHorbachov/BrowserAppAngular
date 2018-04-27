import {AfterViewChecked, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ManagementService} from '../management.service';
import {Subject} from 'rxjs/Subject';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogAddReviewComponent} from '../dialog-add-review/dialog-add-review.component';
import {DialogViewReviewComponent} from '../dialog-view-review/dialog-view-review.component';


@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})

export class UserReviewsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataForDate: any;
  queryString: string;
  listMessages: any;
  rangeDates: any;
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();
  minSelectDate: Date = null;
  listUserHead = ['date', 'message', 'actions'];


  constructor(
    private query: ActivatedRoute,
    private managment: ManagementService,
    public dialogAddReview: MatDialog,
    public dialogViewReview: MatDialog) {
  }

  createTable(data) {
    this.dataForDate = data;
    console.log('Here returned comments', data);
    this.listMessages = new MatTableDataSource(data);
    this.listMessages.paginator = this.paginator;
    this.listMessages.sort = this.sort;
    console.log(this.listMessages);
  }

  getMessageTable() {
    this.managment
      .getMessagesList()
      .subscribe((data: any) => {
        data.length ? this.createTable(data) : console.log('Not are data');
      }, err => {
        console.log('Error on catch Message Table ', err);
      });
  }

  ngOnInit() {
    this.managment.renderTableReviews.subscribe(data => {
      if (data) {
        this.getMessageTable();
      }
    });
    const params = this.query.snapshot.url[0].path;
    this.queryString = params.split('-')[0];
    this.managment.renderTableReviews.next(true);
  }

  saveComment() {
    this.dialogAddReview.open(DialogAddReviewComponent, {
      minWidth: 700,
      minHeight: 500,
      data: {employee: this.queryString}
    });
  }

  viewAction(data) {
    this.dialogViewReview.open(DialogViewReviewComponent, {
      minWidth: 700,
      minHeight: 500,
      data: data
    });
  }

  datePicker() {
    const dataFormat = this.rangeDates.map((date: Date) => date.toLocaleDateString());
    console.log(dataFormat);
  }

  subFormReviews(value) {
    console.log(value);
    const dataFilter = Object
      .values(value)
      .map((date: Date) => {
        return date.toLocaleDateString().split('.').reverse().join('-');
      });
    const filteredDate = this.dataForDate.map(row => row.date).sort();
    // const scanArray = filteredDate.slice(filteredDate.indexOf(dataFilter[0]), filteredDate.lastIndexOf(dataFilter[1]))
    console.log(scanArray);
  }

  /*.map(date => {
      const dataA = date.split('-');
      if (dataA[1][0] === '0') {dataA[1] = dataA[1][1]}
      return dataA.join('-');
    })*/
}
