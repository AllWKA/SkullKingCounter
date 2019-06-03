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
  debug = "none";
  round = 1;
  betting = true;
  state = "Betting";
  getEndSlide = false;
  slideIndex;
  rounds = [0, 1];
  activeIndex = 0;
  lasIndex = 1;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('players').then(async (players) => {
      this.players = players
      // var len = document.getElementsByTagName("img").length;
    });
    this.start();
  }


  @ViewChild(IonSlides) slide: IonSlides;


  getEnd() {
    this.getEndSlide = true;
  }
  async start() {

  }

  async slideChanged() {
    // var index = await this.slide.getActiveIndex()
    // var endIndex = await this.slide.length()
    // if (index != endIndex - 1) {
    //   this.getEndSlide = false;
    // }
  }

  async changePlayer() {
    this.activeIndex = await this.slide.getActiveIndex();
    this.lasIndex = await this.slide.length();
    this.debug = this.activeIndex + "-" + this.lasIndex;
    if (this.betting == false) {
      this.setScore();
    }
    if (this.activeIndex == this.lasIndex - 1) {
      this.betting = !this.betting;
      this.changingState();
      if (this.betting == false) {
        this.rounds.push(this.rounds[this.rounds.length - 1] + 1);
      }
      this.slide.slideTo(0);
      this.getEndSlide = false;
      this.nextRound();
    } else {
      this.activeIndex++;
      this.slide.slideTo(this.activeIndex);
    }
    this.isEnd();
  }

  setScore() {
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

  async isEnd() {
    // if (this.getEndSlide) {
    //   this.betting = !this.betting;
    //   this.changingState();
    //   if (this.betting == false) {
    //     this.rounds.push(this.rounds[this.rounds.length - 1] + 1);
    //   }
    //   this.slide.slideTo(0);
    //   this.getEndSlide = false;
    //   this.nextRound();
    // }


    // this.debug += activeIndex + "-" + lasIndex;
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
