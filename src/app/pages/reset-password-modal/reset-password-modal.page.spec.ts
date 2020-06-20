import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPasswordModalPage } from './reset-password-modal.page';

describe('RestPasswordModalPage', () => {
  let component: RestPasswordModalPage;
  let fixture: ComponentFixture<RestPasswordModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestPasswordModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestPasswordModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
