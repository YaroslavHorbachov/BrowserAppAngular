import {Component, Inject, ViewChild} from '@angular/core';
import {ManagementService} from '../management.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  listUser: MatTableDataSource<Array<IListUserData<string>>> = null;
  listUserHead: any = null;

  constructor(private managementService: ManagementService, private dialog: MatDialog) {
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
      this.listUserHead = ['avatar', 'fname', 'lname', 'email', 'actions']; // COLUMNS IN TABLE
      console.log(this.listUserHead);
      this.listUser.paginator = this.paginator;
      this.listUser.sort = this.sort;
      // console.log(this.listUserHead);
    }, err => {
      console.log('Error in User list', err);
    });
  }

  deleteUser(value) {
    console.log(value);
  }

  editUser(value) {
    console.log(value);
    const dialogRef = this.dialog.open(DialogEditComponent, {
      minWidth: 700,
      minHeight: 500,
      data: {
        name: value.fname || null,
        lname: value.lname || null,
        email: value.email
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
export class DialogEditComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  resultHandler(form) {
    console.log(form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export class IListUserData<T> {
  _id: T;
  email: T;
  password: T;
  fname: T;
  lname: T;
}
