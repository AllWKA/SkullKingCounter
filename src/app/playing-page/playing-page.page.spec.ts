import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingPagePage } from './playing-page.page';

describe('PlayingPagePage', () => {
  let component: PlayingPagePage;
  let fixture: ComponentFixture<PlayingPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
