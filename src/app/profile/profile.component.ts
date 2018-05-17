import {Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ProfileService} from '../services/profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConnectServerService} from '../services/connect-server.service';
import {MatDialog} from '@angular/material';
import {DialogResetpasswordComponent} from '../dialog-resetpassword/dialog-resetpassword.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatarURL: string;
  lastModify: string = null;
  lastVisit: string = null;
  dialogData;
  namePerson: string;
  surnamePerson: string;
  form: FormGroup;
  isExpanded: boolean;
  apiChangeRoute = 'http://localhost:3020/api/change';

  @ViewChild('avatarImage') avatarImage: ElementRef;
  @ViewChild('buttonImage') buttonImage: ElementRef;

  constructor(private _profile: ProfileService,
              private register: ConnectServerService,
              private fb: FormBuilder,
              private _r: Renderer2,
              private dialogResetPassword: MatDialog) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  registerUserCustomConfigs(data) {
    this.avatarURL = data.avatar;
    this.namePerson = data.fname;
    this.surnamePerson = data.lname;
    this.lastModify = data.lastModified;
    this.lastVisit = data.lastVisit;
  }

  uploadFileSub() {
    this.isExpanded = false;
  }

  ngOnInit() {
    Promise.resolve().then(() => this._profile.updateUser({}).subscribe((data: any) => {
      console.log('Date is after init', data);
    })).then(() => this._profile.getUser().subscribe((data: any) => {
      if (data) {
        console.log('This data ', data);
        this.dialogData = data;
        this.registerUserCustomConfigs(data);
      } else {
        this.register.getFacebookUser().subscribe((doc: any) => {
          if (doc) {
            console.log('Facebook data ', doc);
            const dataSend = {name: doc.fname, id: doc._id};
            this.register.authToTrue(dataSend);
            this.registerUserCustomConfigs(doc);
          } else {
            this.register.authToFalse();
          }
        });
      }
    }, (err: any) => {
      console.log('This err ', err);
    }));
  }

  openDialogChangePassword() {
    this.dialogResetPassword.open(DialogResetpasswordComponent, {
      minWidth: 700,
      minHeight: 500,
      data: this.dialogData
    });
  }

  uploadFile(xhr) {
    this._r.setAttribute(this.avatarImage.nativeElement,
      'src',
      xhr.files[0].objectURL.changingThisBreaksApplicationSecurity);
  }

  submitForm(form) {
    const json = {...form.value, status: 'modify'};
    this._profile.updateUser(json).subscribe((data: any) => {
        console.log('Updated data ', data);
        this.namePerson = data.fname;
        this.surnamePerson = data.lname;
        this.isExpanded = false;
      },
      (err: any) => {
        console.log(err);
      });
  }

}
