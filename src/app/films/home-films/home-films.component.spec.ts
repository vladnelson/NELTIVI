import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFilmsComponent } from './home-films.component';

describe('HomeFilmsComponent', () => {
  let component: HomeFilmsComponent;
  let fixture: ComponentFixture<HomeFilmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFilmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
