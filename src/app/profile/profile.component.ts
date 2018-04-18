import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fileName: string;
  fileSize: string;
  isCanBeActive = false;
  form: FormGroup;

  constructor(private _profile: ProfileService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  ngOnInit() {
  }

  submitForm(form) {
    console.log(form);
  }

  submitImageForm(formFile) {
    const file: FileList = formFile.files;
    const fileItem: File = Array.from(file)[0];
    this.fileName = fileItem.name;
    this.fileSize = (fileItem.size / 1000000).toFixed(3);
    const reader = new FileReader();
    reader.readAsDataURL(fileItem);
    reader.onload = () => {
      this.form.get('avatar').setValue({
        filename: fileItem.name,
        filetype: fileItem.type,
        value: reader.result
      });
      this.isCanBeActive = true;
      console.log('file onload');
    };
  }
  sendFormFileData() {
    const formData = this.form.value;
    console.log(formData);
    this._profile.send(formData).subscribe(data => {
      console.log(data);
    })
  }

}
