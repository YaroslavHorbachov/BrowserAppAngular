import {Component, OnInit, ViewChild} from '@angular/core';
import {PrivateManagerService} from '../private-manager.service';
import {ConnectServerService} from '../connect-server.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import 'rxjs/add/operator/mergeMap';
import {Router} from '@angular/router';
import {ManagementComponent} from '../management/management.component';
import {ManagementService} from '../management.service';

@Component({
  selector: 'app-reviews-manager',
  templateUrl: './reviews-manager.component.html',
  styleUrls: ['./reviews-manager.component.css']
})
export class ReviewsManagerComponent implements OnInit {
  listEmployees: MatTableDataSource<Array<Object>>;
  listUserHead = ['avatar', 'email', 'fullname', 'actions', 'hidden'];
  backdataList: Array<Object>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _pmanager: PrivateManagerService,
              private management: ManagementService,
              private router: Router) {
  }

  private renderTable(data: any) {
    this.listEmployees = new MatTableDataSource<Array<Object>>(data);
    this.listEmployees.sort = this.sort;
    this.listEmployees.paginator = this.paginator;
  }

  private getEmployees(): any {
    return this._pmanager.getManagerEmployees();

  }

  private getCommentedEmployees() {
    return this._pmanager.getManagerComments({data: this.backdataList});
  }

  ngOnInit() {
    this.getEmployees()
      .map(data => {
        this.backdataList = [...data];
        this.renderTable([...data]);
        return data;
      }).flatMap(() => {
      return this.getCommentedEmployees();
    }).subscribe(data => {
      this.management.setListCommentedUsers([...data]);
      console.log('Done ');
    });
  }

  reviewAction(user) {
    this.router.navigate([`${user._id}-reviews`]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.listEmployees.filter = filterValue;
  }

}
