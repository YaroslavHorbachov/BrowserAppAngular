import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PrivateManagerService {
  listOfUsers: BehaviorSubject<any> = new BehaviorSubject(0);
  constructor() {}
  setListOfUsers(data){
    this.listOfUsers.next(data);
  }
  getListOfUsers(){
    return this.listOfUsers.getValue();
  }

}
