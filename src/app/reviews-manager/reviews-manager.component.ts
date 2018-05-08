import { Component, OnInit } from '@angular/core';
import {PrivateManagerService} from '../private-manager.service';
import {ConnectServerService} from '../connect-server.service';

@Component({
  selector: 'app-reviews-manager',
  templateUrl: './reviews-manager.component.html',
  styleUrls: ['./reviews-manager.component.css']
})
export class ReviewsManagerComponent implements OnInit {
  listEmployees: any;

  constructor(private _pmanager: PrivateManagerService,
              private managment: ConnectServerService) { }

  ngOnInit() {

  }

}
