import {Component, OnInit} from '@angular/core';
import {PrivateManagerService} from '../private-manager.service';

@Component({
  selector: 'app-reviews-management',
  templateUrl: './reviews-management.component.html',
  styleUrls: ['./reviews-management.component.css']
})
export class ReviewsManagementComponent implements OnInit {
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();
  minSelectDate: any;
  maxSelectDate: any;
  listLeads: any;

  constructor(private _mservice: PrivateManagerService) {
  }

  ngOnInit() {
    this.listLeads = this._mservice.getListOfUsers();
    console.log(this.listLeads);
  }

}
