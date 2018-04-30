import {Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ProfileService} from '../profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConnectServerService} from '../connect-server.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  avatarURL: string;
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
              private _r: Renderer2) {
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
  }

  uploadFileSub() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this._profile.getUser().subscribe((data: any) => {
      if (data) {
        console.log('This data ', data);
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
    });
  }

  uploadFile(xhr) {
    this._r.setAttribute(this.avatarImage.nativeElement,
      'src',
      xhr.files[0].objectURL.changingThisBreaksApplicationSecurity);
  }

  submitForm(form) {
    this._profile.updateUser(form.value).subscribe((data: any) => {
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
