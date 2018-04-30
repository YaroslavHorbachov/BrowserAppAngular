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

  constructor(private management: ManagementService, private router: Router) {
  }

  ngOnInit() {
    this.management.getEmployeeList().subscribe((data: any) => {
      if (data) {
        console.log('Here employees list', data);
        this.listEmployees = new MatTableDataSource(data);
        this.listEmployees.sort = this.sort;
        this.listEmployees.paginator = this.paginator;
      }
    }, (err: any) => {
      console.log('Error on review page', err);
    });
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
