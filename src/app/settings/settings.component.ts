import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConnectServerService} from '../connect-server.service';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('panel') panel: MatExpansionPanel;
  header: string = null;
  footer: string = null;
  date;

  constructor(private _manage: ConnectServerService) {
  }

  ngOnInit() {
    this
      ._manage
      .getEmailSettings()
      .subscribe(
        (data: any) => {
          if (data) {
            const {header, footer, date} = data;
            this.footer = footer;
            this.header = header;
            this.date = date;
            console.log(this.date, this.footer, this.header);
            return true;
          }
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

  closeEmailSettings() {
    this.panel.close();
  }

}
