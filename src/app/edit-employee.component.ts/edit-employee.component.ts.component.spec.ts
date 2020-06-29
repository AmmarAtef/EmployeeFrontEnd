import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployee.Component.TsComponent } from './edit-employee.component';

describe('EditEmployee.Component.TsComponent', () => {
  let component: EditEmployee.Component.TsComponent;
  let fixture: ComponentFixture<EditEmployee.Component.TsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmployee.Component.TsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployee.Component.TsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
