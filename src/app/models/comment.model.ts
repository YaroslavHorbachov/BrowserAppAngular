import {User} from './user.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Comment {
  public date: string;
  public employee: string;
  public lead: string;
  public message: string;
  public manager: string;
  public base: Array<User>;
  public user_employer: User;
  public avatar: string;
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


