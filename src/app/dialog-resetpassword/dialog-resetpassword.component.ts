import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProfileService} from '../services/profile.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-resetpassword',
  templateUrl: './dialog-resetpassword.component.html',
  styleUrls: ['./dialog-resetpassword.component.css']
})
export class DialogResetpasswordComponent implements OnInit {
  notEqual: boolean = null;
  prevPassword = null;

  constructor(private profile: ProfileService,
              private dialogRef: MatDialogRef<DialogResetpasswordComponent>) {
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    const {oldpassword, newpassword} = form.value;
    this.profile.checkAndUpdatePassword({oldpassword, newpassword}).subscribe(
      (data: any) => {
        if (data.status === 'done') {
          console.log('Update success');
          this.dialogRef.close();
        } else {
          this.notEqual = true;
          this.prevPassword = '';
        }
      }, (err: any) => {
        console.log('Return req error ', err);
      }
    );
  }

}
