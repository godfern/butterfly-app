import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMessageModalPage } from './draft-message-modal.page';

describe('DraftMessageModalPage', () => {
  let component: DraftMessageModalPage;
  let fixture: ComponentFixture<DraftMessageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftMessageModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftMessageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
