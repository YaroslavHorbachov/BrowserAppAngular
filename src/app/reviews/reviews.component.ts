import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from '../management.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  listEmployees: MatTableDataSource<Array<Object>>;
  listUserHead = ['avatar', 'email', 'fullname', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private managment: ManagementService, private router: Router) {
  }

  ngOnInit() {
    this.managment.getEmployeeList().subscribe((data: any) => {
      if (data) {
        console.log('Here employees list', data);
        this.listEmployees = new MatTableDataSource(data);
        this.listEmployees.sort = this.sort;
        this.listEmployees.paginator = this.paginator;
      }
    }, err => {
      console.log('Error on review page', err);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listEmployees.filter = filterValue;
  }

  reviewAction(user) {
    setTimeout(() => this.router.navigate([`${user._id}-reviews`]), 500);
  }

}
