import {User} from './user.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Comment {
  private date: string;
  private employee: string;
  private lead: string;
  private message: string;
  private manager: string;
  private base: Array<User>;
  private user_employer: User;
  private avatar: string;
  constructor(
    {date, employee, lead, message, manager, base}
  ) {
    this.date = date;
    this.employee = employee;
    this.lead = lead;
    this.message = message;
    this.manager = manager;
    this.base = base;
  }

  get fullname() {
    const [employee] = this.base.filter(user => user._id === this.employee);
    this.user_employer = employee;
    this.avatar = this.user_employer.avatar;
    return `${employee.fname} ${employee.lname}`;
  }
}


