import {Component, OnInit, ViewChild} from '@angular/core';
import {PrivateManagerService} from '../private-manager.service';
import {ManagementService} from '../management.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-reviews-management',
  templateUrl: './reviews-management.component.html',
  styleUrls: ['./reviews-management.component.css']
})
export class ReviewsManagementComponent implements OnInit {
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();
  mainList: Array<any>;
  minSelectDate: any;
  maxSelectDate: any;
  constructor(private _mservice: PrivateManagerService) {
  }

  ngOnInit() {
    this._mservice.getListOfUsers().subscribe((data: any) => this.mainList = data);
  }


  subFormReviews() {
  }
}
