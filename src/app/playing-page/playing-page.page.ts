import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-playing-page',
  templateUrl: './playing-page.page.html',
  styleUrls: ['./playing-page.page.scss'],
})
export class PlayingPagePage implements OnInit {
  players = []
  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('players').then((players) => {
      this.players = players;
    });
  }

  round = 1;
  betting = true;
  state = "Betting";
  getEndSlide = false;
  slideIndex;
  rounds = [1];

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
    // // si apuestas 0
    // if (this.bet == 0) {
    //   // si has apostado 0 y has fallado
    //   if (this.bet - this.roundScore != 0) {
    //     this.score += -(this.round * 10)
    //   } else {
    //     this.score += this.round * 10
    //   }
    //   //si has apostado algo  
    // } else {
    //   //si has fallado al apostar
    //   if (this.bet - this.roundScore != 0) {
    //     this.score += -10 * (Math.abs(this.bet - this.roundScore))
    //   } else {
    //     this.score += this.bet * 20 + this.extra;
    //   }
    // }
    // this.bet = 0;
    // this.roundScore = 0;

    //TODO: ARREGLA ESTA MIERDA JODIO MATADO
    this.slide.getActiveIndex().then(i => {
      // si apuestas 0
      if (this.players[i].bet == 0) {
        // si has apostado 0 y has fallado
        if (this.players[i].bet - this.players[i].roundScore != 0) {
          this.players[i].score += -(this.players[i].round * 10)
        } else {
          this.players[i].score += this.round * 10
        }
        //si has apostado algo  
      } else {
        //si has fallado al apostar
        if (this.players[i].bet - this.players[i].roundScore != 0) {
          this.players[i].score += -10 * (Math.abs(this.players[i].bet - this.players[i].roundScore))
        } else {
          this.players[i].score += this.players[i].bet * 20 + this.players[i].extra;
        }
      }
      this.players[i].bet = 0;
      this.players[i].roundScore = 0;
    })
  }

  isEnd() {
    if (this.getEndSlide) {
      this.betting = !this.betting;
      this.changingState();
      this.rounds.push(this.rounds[this.rounds.length - 1] + 1);
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
    this.slide.getActiveIndex().then(i => {
      if (this.betting) {
        this.players[i].bet++;
      } else {
        this.players[i].roundScore++;
      }
    })
  }

  substract() {
    this.slide.getActiveIndex().then(i => {
      if (this.betting) {
        this.players[i].bet--;
        if (this.players[i].bet < 0) {
          this.players[i].bet = 0;
        }
      } else {
        this.players[i].roundScore--;
        if (this.players[i].roundScore < 0) {
          this.players[i].roundScore = 0;
        }
      }
    })
  }
}
