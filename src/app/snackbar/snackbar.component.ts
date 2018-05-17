import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';
import {ProfileService} from '../services/profile.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  @ViewChild('original') originalRef: ElementRef;
  toggle = false;
  emailToReset: any = null;
  namePerson = '';
  surnamePerson = '';
  checkEmail: any = '';
  emailSend: any = null;

  constructor(
    private snackBar: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _p: ProfileService
  ) {
  }
  Toggle() {
    this.toggle = !this.toggle;
  }
  ngOnInit() {
    this.snackBar.onAction().subscribe(data => {
      console.log(data);
    });
    console.log(this.data.email);
    this.emailToReset = this.data.email;
  }

  resetPassword() {
    this.emailSend = !this.emailSend;
    this._p
      .resetPassword({email: this.checkEmail})
      .subscribe((doc: any) => {
        if (doc) {
          this.namePerson = doc.name;
          this.surnamePerson = doc.fname;
          console.log(doc);
        }
        else {
          this.emailSend = !this.emailSend;
        }
      }, (err: any) => {
        console.error(err);
      });
  }

  close() {
    this.snackBar.dismiss();
  }
}
