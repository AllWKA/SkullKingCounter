import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-playing-page',
  templateUrl: './playing-page.page.html',
  styleUrls: ['./playing-page.page.scss'],
})
export class PlayingPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  score = 0;
  bet = 0;
  roundScore = 0;
  extra = 0;
  round = 1;
  betting = true;
  state = "Betting";
  getEndSlide = false;
  slideIndex;

  @ViewChild(IonSlides) slide: IonSlides;


  getEnd() {
    this.getEndSlide = true;
  }
  getStart() {
    // this.getEndSlide = false;
  }

  async slideChanged() {
    var index = await this.slide.getActiveIndex()
    var endIndex = await this.slide.length()
    if (index != endIndex - 1) {
      this.getEndSlide = false;
    }
  }

  changePlayer() {
    this.actualIndex();
    if (this.betting == false) {
      this.setScore();
    }
    this.slide.slideNext();
    this.isEnd();
  }

  setScore() {
    // si apuestas 0
    if (this.bet == 0) {
      // si has apostado 0 y has fallado
      if (this.bet - this.roundScore != 0) {
        this.score += -(this.round * 10)
      } else {
        this.score += this.round * 10
      }
      //si has apostado algo  
    } else {
      //si has fallado al apostar
      if (this.bet - this.roundScore != 0) {
        this.score += -10 * (Math.abs(this.bet - this.roundScore))
      } else {
        this.score += this.bet * 20 + this.extra;
      }
    }
    this.bet = 0;
    this.roundScore = 0;
  }

  isEnd() {
    if (this.getEndSlide) {
      this.betting = !this.betting;
      this.changingState();
      this.slide.slideTo(0);
      this.getEndSlide = false;
      this.nextRound();
    }
  }

  actualIndex() {
    this.slide.getActiveIndex().then(i => {
      this.slideIndex = i;
    });
  }

  nextRound() {
    if (this.betting == true) {
      this.round++;
    }
  }

  changingState() {
    if (this.betting) {
      this.state = "Betting";
    } else {
      this.state = "Playing Round";
    }
  }

  add() {
    if (this.betting) {
      this.bet++;
    } else {
      this.roundScore++;
    }
  }

  substract() {
    if (this.betting) {
      this.bet--;
      if (this.bet < 0) {
        this.bet = 0;
      }
    } else {
      this.roundScore--;
      if (this.roundScore < 0) {
        this.roundScore = 0;
      }
    }
  }
}
