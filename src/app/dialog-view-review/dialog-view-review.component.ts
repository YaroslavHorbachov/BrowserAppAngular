import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-view-review',
  templateUrl: './dialog-view-review.component.html',
  styleUrls: ['./dialog-view-review.component.css']
})
export class DialogViewReviewComponent implements OnInit {
  dataView: any;
  date: String;
  constructor(private dialogRef: MatDialogRef<DialogViewReviewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
  }
  ngOnInit() {
    this.dataView = this.data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
