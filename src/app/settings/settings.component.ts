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

  }

}
