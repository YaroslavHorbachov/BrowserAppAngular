import {Component, OnInit} from '@angular/core';
import {ConnectServerService} from '../connect-server.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  header: string = null;
  footer: string = null;

  constructor(private _manage: ConnectServerService) {
  }

  ngOnInit() {
    this
      ._manage
      .getEmailSettings()
      .subscribe(
        data => {
          data ?
            console.log('Catch data onInit ', data) :
            console.log('Data onInit not existing');
        },
        err => console.log(err));
  }

  setEmailSettings(form) {
    this
      ._manage
      .setEmailSettings(form.value)
      .subscribe(
        data => console.log('Catch data click ', data),
        err => console.log(err));

  }

}
