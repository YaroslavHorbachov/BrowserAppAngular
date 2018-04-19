import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from '../management.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  listUser: MatTableDataSource<Array<IListUserData<string>>> = null;
  listUserHead: any = null;

  constructor(private managementService: ManagementService) {
    this.getListUserButton();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listUser.filter = filterValue;
  }

  getListUserButton() {
    this.managementService.getListUsers().subscribe((data: any) => {
      console.log('Data success delivered ', data);
      this.listUser = new MatTableDataSource(data.data);
      this.listUserHead = Object.keys(data.data.slice(-1)[0]).filter(item => item !== 'password');
      this.listUser.paginator = this.paginator;
      this.listUser.sort = this.sort;
      console.log(this.listUserHead);
    }, err => {
      console.log('Error in User list', err);
    });
  }
}

export class IListUserData<T> {
  _id: T;
  email: T;
  password: T;
  fname: T;
  lname: T;
}
