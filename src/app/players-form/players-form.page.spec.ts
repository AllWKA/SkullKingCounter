import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFormPage } from './players-form.page';

describe('PlayersFormPage', () => {
  let component: PlayersFormPage;
  let fixture: ComponentFixture<PlayersFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
