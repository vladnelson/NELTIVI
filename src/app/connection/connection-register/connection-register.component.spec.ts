import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionRegisterComponent } from './connection-register.component';

describe('ConnectionRegisterComponent', () => {
  let component: ConnectionRegisterComponent;
  let fixture: ComponentFixture<ConnectionRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
