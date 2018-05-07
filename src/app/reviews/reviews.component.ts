import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from '../management.service';
import {MatCheckbox, MatCheckboxChange, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  listEmployees: MatTableDataSource<Array<Object>>;
  listUserHead = ['avatar', 'email', 'fullname', 'actions', 'hidden'];
  mainData;
  listCommentedEmployees;
  months;
  dbMessages;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private management: ManagementService,
    private router: Router) {
  }

  ngOnInit() {
    this.getMessageHistory();
    this.getEmployeeList();
  }

  renderTable(data) {
    this.listEmployees = new MatTableDataSource(data);
    this.listEmployees.sort = this.sort;
    this.listEmployees.paginator = this.paginator;
  }

  getMessageHistory() {
    this.management.getMessageHistory()
      .subscribe((data: any) => {
        console.log('Start');
        if (data) {
          this.dbMessages = [...data];
          this.listCommentedEmployees = data.map(user => user.employee);
          this.management.setListCommentedUsers(this.listCommentedEmployees);
          this.setMonthsList(data);
        }
        console.log('Error ', data);
      });
  }

  getEmployeeList() {
    this.management.getEmployeeList().subscribe((data: any) => {
      if (data) {
        console.log('Here employees list', data);
        this.mainData = [...data];
        this.renderTable(data);
      }
    }, (err: any) => {
      console.log('Error on review page', err);
    });
  }

  setMonthsList(data) {
    const preObj = {};
    this.months = data.map(user => user.date).forEach(date => {
      if (preObj[new Date(date).getMonth()]) {
        return null;
      }
      preObj[new Date(date).getMonth()] = date;
    });
    this.months = Object.values(preObj);
  }

  editTableByMonth(date) {
    if (new Date().getMonth() === new Date(date).getMonth()) {
      return this.renderTable([...this.mainData]);
    }
    /*this.listEmployees.data.filter(user => user.)*/
    const currentUsers = this.dbMessages
      .filter(msg => new Date(msg.date).getMonth() === new Date(date).getMonth())
      .map(user => user.employee);
    const currentEmployees = [...this.mainData].filter(user => currentUsers.includes(user._id));
    this.renderTable(currentEmployees);
  }

  checked(id) {
    return this.listCommentedEmployees.includes(id);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.listEmployees.filter = filterValue;
  }

  reviewAction(user) {
    this.router.navigate([`${user._id}-reviews`]).then();
  }

}
