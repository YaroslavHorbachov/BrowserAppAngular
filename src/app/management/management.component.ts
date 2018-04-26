import {Component, DoCheck, Inject, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from '../management.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';


const rerenderTable: Subject<boolean> = new Subject<boolean>();

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listUser: MatTableDataSource<Array<IListUserData<string>>> = null;
  listUserHead = ['avatar', 'fname', 'lname', 'email', 'leads', 'role', 'actions'];

  constructor(private managementService: ManagementService, private dialog: MatDialog) {
    this.getListUserButton();
  }

  ngOnInit() {
    rerenderTable.subscribe(event => {
      if (event) {
        this.getListUserButton();
      }
    });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.listUser.filter = filterValue;
  }

  getListUserButton() {
    this.managementService.getListUsers().subscribe((data: any) => {
      console.log('Rerender ', data)
      this.listUser = new MatTableDataSource(data.data);
      this.listUser.paginator = this.paginator;
      this.listUser.sort = this.sort;
      // console.log(this.listUserHead);
    }, err => {
      console.log('Error in User list', err);
    });
  }

  deleteUser(value) {
    this.managementService.removeUser(value).subscribe(data => {
        console.log('Data successdully delivered ', data);
        setTimeout(() => rerenderTable.next(true), 1000);
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

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.html',
  styleUrls: ['./dialog-edit.css']
})
export class DialogEditComponent implements OnInit {
  roleSelect: any;
  selectLeads: any;
  leads: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private managementService: ManagementService) {
  }

  ngOnInit() {
    const Leads = this.data.block
      .filter(user => user.role === 'lead')
      .map(lead => {
        return {
          id: lead._id,
          name: lead.fname,
          surname: lead.lname,
          email: lead.email
        };
      });
    // const Employees =  this.data.block.filter(user => user.role === 'employee');

    this.leads = Leads;
    this.selectLeads = this.data.leads;
    this.roleSelect = this.data.role;
    console.log('All leads ', this.leads);


    // const leadBlock = this.data.block
    //   .filter(user => user.role === 'lead');
    //
    // this.leads = leadBlock;
    // this.selectLeads = this.data.block;
    // console.log(this.leads, this.selectLeads);
    // console.log(this.data.block);
  }

  resultHandler(form) {
    console.log(form.value);
    const value = form.value;
    value.email = this.data.email;
    value.role = this.roleSelect;
    value.status = 'admin';
    console.log(value);
    this.managementService.editUser(value).subscribe(data => {
      console.log('Data catch successfully ', data);
    }, err => {
      console.log('Catch error in editUser from Admin', err);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    setTimeout(() => rerenderTable.next(true), 1000);
  }

  closeModal() {
    this.dialogRef.close();
    setTimeout(() => rerenderTable.next(true), 1000);
  }

}

export class IListUserData<T> {
  _id: T;
  email: T;
  password: T;
  fname: T;
  lname: T;
}
