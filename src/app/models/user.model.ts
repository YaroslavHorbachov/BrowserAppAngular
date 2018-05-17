export class User {
  private fname: string;
  private lname: string;
  private role: string;
  private email: string;
  private employees: Array<Object>;
  private leads: Array<Object>;
  private avatar: string;
  private manager: Array<Object>;
  private lastModifyed: Date;
  private lastVisit: Date;
  constructor({
                fname,
                lname,
                role,
                email,
                employees,
                leads,
                avatar,
                manager,
                lastModifyed,
                lastVisit
              }) {
    this.fname = fname;
    this.lname = lname;
    this.role = role;
    this.email = email;
    this.employees = employees;
    this.leads = leads;
    this.avatar = avatar;
    this.manager = manager;
    this.lastModifyed = lastModifyed;
    this.lastVisit = lastVisit;
  }

  get fullname() {
    return `${this.fname} ${this.lname}`;
  }
}
