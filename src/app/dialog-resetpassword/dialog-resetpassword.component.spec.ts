import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResetpasswordComponent } from './dialog-resetpassword.component';

describe('DialogResetpasswordComponent', () => {
  let component: DialogResetpasswordComponent;
  let fixture: ComponentFixture<DialogResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
