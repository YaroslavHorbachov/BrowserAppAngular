import {Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ProfileService} from '../profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, DoCheck {
  avatarURL: string;
  namePerson: string;
  surnamePerson: string;
  form: FormGroup;
  apiChangeRoute = 'http://localhost:3020/api/change';
  isExpanded: boolean;
  @ViewChild('avatarImage') avatarImage: ElementRef;
  @ViewChild('buttonImage') buttonImage: ElementRef;

  constructor(private _profile: ProfileService, private fb: FormBuilder, private _r: Renderer2) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  ngDoCheck() {

  }

  changeExpand(event) {
    console.log(event);
    this.isExpanded = false;
  }

  ngOnInit() {
    this._profile.getUser().subscribe((data: any) => {
      console.log('This data ', data);
      this.avatarURL = data.avatar;
      this.namePerson = data.fname;
      this.surnamePerson = data.lname;
    }, err => {
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
      err => {
        console.log(err);
      });
  }

}
