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
  round = 0;
  betting = true;
  state = "Betting";
  getEndSlide = false;
  slideIndex;
  rounds = [1];

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('players').then(async (players) => {
      this.players = players
      var len = document.getElementsByTagName("img").length;
      // this.debug += document.getElementsByTagName("img").length;
      // for (let i = 0; i < len; i++) {
      //   this.debug += len;
      // }
    });
    var len = document.getElementsByTagName("img").length;
    for (let i = 0; i < len; i++) {
      this.debug += document.getElementsByClassName("characterPlayable").item(i);
    }
  }


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
