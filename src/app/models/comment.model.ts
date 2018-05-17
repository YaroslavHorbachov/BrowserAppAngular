export class Comment{
  private date: string;
  private employee: string;
  private lead: string;
  private message: string;
  private manager: string;

  constructor({date, employee, lead, message, manager}) {
    this.date = date;
    this.employee = employee;
    this.lead = lead;
    this.message = message;
    this.manager = manager;
  }
  set base(base){
    this._base = [...base];
  }

  get fullname() {
    return this._base && this.compute();
  }

  compute() {
    console.log('MODEL ', this._base)
  }
}


