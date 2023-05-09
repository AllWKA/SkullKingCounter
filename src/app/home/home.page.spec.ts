import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomePage} from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate default minimum number of player in number of player input', () => {
    expect(fixture.nativeElement.querySelector('#numPlayersInput').value).toBe('2')
  });

  describe('use invalid number of players', () => {
    xit('use number of players under 2', () => {
      const numberOfPlayersInput: HTMLInputElement = fixture.nativeElement.querySelector('#numPlayersInput')

      const continueButton:HTMLButtonElement = fixture.nativeElement.querySelector('#continueButton')

      numberOfPlayersInput.value = '0'

      continueButton.click()

      const errorMessage: HTMLParagraphElement | null = fixture.nativeElement.querySelector('.error-message')

      expect(errorMessage).not.toBeNull()
    });
  })
});
