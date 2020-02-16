import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentPage } from './sent.page';

describe('SentPage', () => {
  let component: SentPage;
  let fixture: ComponentFixture<SentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
