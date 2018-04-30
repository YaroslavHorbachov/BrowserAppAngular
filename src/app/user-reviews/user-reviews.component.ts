import { Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ManagementService} from '../management.service';
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
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();
  minSelectDate: Date = null;
  maxSelectDate: Date = null;
  listUserHead = ['date', 'message', 'actions'];


  constructor(
    private query: ActivatedRoute,
    private managment: ManagementService,
    public dialogAddReview: MatDialog,
    public dialogViewReview: MatDialog) {
  }

  createTable(data) {
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
        this.dataForDate = [...data];
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
  subFormReviews() {
    const l = this.minSelectDate,
      h = this.maxSelectDate,
      filteredSet = this.dataForDate.filter(comment => {
        return new Date(comment.date).getTime() >= l.getTime() &&
          new Date(comment.date).getTime() <= h.getTime();
      });
    this.createTable(filteredSet);
  }
}
