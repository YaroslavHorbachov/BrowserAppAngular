import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ManagementService} from '../services/management.service';
import {TableRenderService} from '../services/table-render.service';

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
    private managementService: ManagementService,
    private table: TableRenderService) {
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
    this.table.rerenderTable = true;
  }

  closeModal() {
    this.dialogRef.close();
    this.table.rerenderTable = true;
  }
}
