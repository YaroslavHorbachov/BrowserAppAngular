import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ManagementService} from '../management.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {PrivateManagerService} from '../private-manager.service';


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

  constructor(
    private managementService: ManagementService,
    private dialog: MatDialog,
    private _pmanager: PrivateManagerService) {
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
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.listUser.filter = filterValue;
  }

  getListUserButton() {
    this.managementService.getListUsers().subscribe((data: any) => {
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
    /* let listOfLeads = [];
    /!* const listLeads = *!/data.map(user => {
       listOfLeads = [...listOfLeads, ...user.leads];
     });*/
    /*console.log('Check leads ', listOfLeads);*/
    const listOfLeads = data.filter(user => user.role === 'lead').map(user => user.email);
    data.forEach(user => {
      user.leads.forEach((lead, id, arrLead) => {
        return listOfLeads.includes(lead) ? null : arrLead.splice(id, 1);
      });
    });
    return data;
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
  filteredManagerBase = [];
  filteredManager: any;
  managerControl: any;
  roleSelect: any;
  selectLeads: any;
  leads: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private managementService: ManagementService) {
  }

  ngOnInit() {
    this.leads = this.data.block
      .filter(user => user.role === 'lead' && user.email !== this.data.email)
      .map(lead => ({
        id: lead._id,
        name: lead.fname,
        surname: lead.lname,
        email: lead.email
      }));
    this.selectLeads = this.data.leads;
    this.roleSelect = this.data.role;
    this.getManagerList(this.data.block);
  }

  filteredManagerInput(value) {
    this.filteredManager = this.filteredManagerBase
      .filter(name => name.toLowerCase().indexOf(value.toLowerCase()) === 0);
  }

  getManagerList(base) {
    this.filteredManagerBase = base
      .filter(user => user.role === 'manager')
      .map(user => {
        return {user, text: `${user.fname} ${user.lname} ${user.email}`};
      });
    this.filteredManager = [...this.filteredManagerBase];
  }

  generateManagerFormData(manager) {
    try {
      return this.filteredManagerBase.filter(data => data.text === manager)[0].user;
    } catch (e) {
      return {};
    }
  }

  resultHandler(form) {
    console.log(form.value);
    const value = form.value;
    value.manager = this.generateManagerFormData(value.manager)._id;
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
  email: T;
  fname: T;
  lname: T;
}
