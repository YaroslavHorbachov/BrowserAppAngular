import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ManagementService} from '../management.service';

@Component({
  selector: 'app-dialog-add-review',
  templateUrl: './dialog-add-review.component.html',
  styleUrls: ['./dialog-add-review.component.css']
})
export class DialogAddReviewComponent {
  countWords = 0;
  minSelectDate: any;
  minDate: Date = new Date(2000, 0, 1);
  maxDate: Date = new Date();

  constructor(private dialogRef: MatDialogRef<DialogAddReviewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private managment: ManagementService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rangeWord(value) {
    const arrlength = value.split(/(\s+)/).filter(i => i);
    this.countWords = arrlength.length;
    console.log('Change count words ', this.countWords);
  }

  sendMessage(message) {
    message.employee = this.data.employee;
    message.date = message.date.toLocaleDateString().split('.').reverse().join('-');
    this.managment
      .sendMessage(message)
      .subscribe((data: any) => {
        console.log('Catch ', data);
        this.managment.renderTableReviews.next(true);
        this.dialogRef.close();
      }, err => {
        console.log('Error in save Comment Action ', err);
      });
  }
}
