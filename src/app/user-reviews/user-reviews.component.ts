import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ManagementService} from '../management.service';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})

export class UserReviewsComponent implements OnInit {
  queryString: string;
  listMessages: any;
  rangeDates: any;
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();
  minSelectDate: Date = null;
  listUserHead = ['date', 'fullname', 'actions'];
  renderTable: Subject<any> = new Subject<any>();

  constructor(
    private query: ActivatedRoute,
    private managment: ManagementService) {
  }

  getMessageTable() {
    this.managment.getMessagesList().subscribe((data: any) => {
      console.log('Here returned comments', data);
      this.listMessages = data.length ? data : null;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.renderTable.subscribe(data => {
      if (data) {
        this.getMessageTable();
      }
    });
    const params = this.query.snapshot.url[0].path;
    this.queryString = params.split('-')[0];
    this.renderTable.next(true);
  }

  saveComment(value) {
    const message = {message: value, employee: this.queryString};
    this.managment.sendMessage(message).subscribe((data: any) => {
      console.log('Catch ', data);
      this.renderTable.next(true);
    }, err => {
      console.log('Error in save Comment Action ', err);
    });
  }

  datePicker() {
    const dataFormat = this.rangeDates.map((date: Date) => date.toLocaleDateString());
    console.log(dataFormat);
  }

  subFormReviews(value) {
    console.log(value);
  }

}
