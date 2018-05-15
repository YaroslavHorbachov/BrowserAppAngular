import {Component, OnInit, ViewChild} from '@angular/core';
import {PrivateManagerService} from '../private-manager.service';
import {ManagementService} from '../management.service';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ReportComponentComponent} from '../report-component/report-component.component';

@Component({
  selector: 'app-reviews-management',
  templateUrl: './reviews-management.component.html',
  styleUrls: ['./reviews-management.component.css']
})
export class ReviewsManagementComponent implements OnInit {
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();
  mainList: Array<any>;
  userList: Array<Object>;
  minSelectDate: any;
  maxSelectDate: any;

  constructor(
    private _pmanager: PrivateManagerService,
    private report: MatDialog
  ) {
  }

  ngOnInit() {
    this._pmanager.getListOfUsers().subscribe((data: any) => {
      console.log(data);
      this.mainList = data.data;
      this.userList = data.user;
    });
  }

  openReport() {
    this.report.open(ReportComponentComponent, {
      minWidth: 700,
      minHeight: 500,
      data: {
        mainList: this.mainList,
        userList: this.userList
      }});

  }


  subFormReviews() {
  }
}
