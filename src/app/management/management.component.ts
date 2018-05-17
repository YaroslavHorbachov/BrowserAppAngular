import {Component,  OnInit, ViewChild} from '@angular/core';
import {ManagementService} from '../services/management.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {PrivateManagerService} from '../services/private-manager.service';
import {DialogEditComponent} from './dialog-edit';
import {TableRenderService} from '../services/table-render.service';


// const rerenderTable: Subject<boolean> = new Subject<boolean>();

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listUser: MatTableDataSource<Array<IListUserData<string>>>;
  listUserHead = ['avatar', 'fname', 'lname', 'email', 'leads', 'role', 'actions'];

  constructor(
    private management: ManagementService,
    private dialog: MatDialog,
    private _pmanager: PrivateManagerService,
    private table: TableRenderService ) {
    this.getListUserButton();
  }

  ngOnInit() {
    this.table.rerenderTable.subscribe((event: boolean) => {
      if (event) {
        this.getListUserButton();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.listUser.filter = filterValue;
  }

  getListUserButton() {
    this.management.getListUsers().subscribe((data: any) => {
      console.log('Rerender ', data);
      const filteredData = this.checkLeads([...data.data]);
      this._pmanager.setListOfUsers([...data.data]);
      this.listUser = new MatTableDataSource(filteredData);
      this.listUser.paginator = this.paginator;
      this.listUser.sort = this.sort;
    }, err => {
      console.log('Error in User list', err);
    });
  }

  checkLeads(data) {
    const listOfLeads = data.filter(user => user.role === 'lead').map(user => user.email);
    data.forEach(user => {
      user.leads.forEach((lead, id, arrLead) => {
        return listOfLeads.includes(lead) ? null : arrLead.splice(id, 1);
      });
    });
    return data;
  }

  deleteUser(value) {
    this.management.removeUser(value).subscribe(data => {
        console.log('Data successdully delivered ', data);
        this.table.rerenderTable = true;
      },
      error => {
        console.log('Error in delete User service', error);
      }
    );
  }

  editUser(value) {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      minWidth: 700,
      minHeight: 500,
      data: {
        block: this.listUser.data,
        name: value.fname || null,
        lname: value.lname || null,
        email: value.email,
        role: value.role,
        leads: value.leads
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      value.name = result;
    });
  }
}
export class IListUserData<T> {
  email: T;
  fname: T;
  lname: T;
}
