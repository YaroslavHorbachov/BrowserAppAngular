import {Component, Inject, OnInit} from '@angular/core';
import {ManagementService} from '../../services/management.service';
import {TableRenderService} from '../../services/table-render.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogEditComponent} from '../../management/dialog-edit';
import {DepartmentService} from '../../services/department-service.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-check-review',
  templateUrl: './dialog-check-review.component.html',
  styleUrls: ['./dialog-check-review.component.css']
})
export class DialogCheckReviewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCheckReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {employer: User},
              private _department: DepartmentService) {}

  ngOnInit() {
    console.log(this.data)
  }

  submitAction() {
    this._department.submitDialog(this.data.employer);
    this.dialogRef.close();
  }

  dismissAction() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
