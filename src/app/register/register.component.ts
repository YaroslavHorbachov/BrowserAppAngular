import {Component, EventEmitter, Output} from '@angular/core';
import {ConnectServerService} from '../services/connect-server.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() auth: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private register: ConnectServerService, private router: Router) {
  }

  stateData: any = false;

  setStateData(value): void {
    if (value) {
      this.stateData = 'VALID';
    } else {
      this.register.authToFalse();
      this.stateData = 'INVALID';
    }
  }

  submitForm(dataForm): boolean {
    const value = dataForm.value;
    console.log('JSON ', dataForm.value);
    if (dataForm.form.status === 'INVALID' || value.password !== value.password2) {
      this.setStateData(false);
      return false;
    } else {
      this.register.getRegister(dataForm.value)
        .subscribe(
          (data: any) => {
            if (data.state === 'done') {
              setTimeout(() =>
                this.router.navigate(['login', {email: value.email}]), 3000);
            } else {
              console.error(data.state);
            }
          },
          (err: any) => {
            console.log('Error on client', err);
            this.setStateData(false);
            setTimeout(() => this.router.navigate(['/']), 3000);
          });
    }
  }
}
