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
  debug = "aaaaa ";
  round = 1;
  betting = true;
  state = "Betting";
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
  }


  @ViewChild(IonSlides) slide: IonSlides;


  async changePlayer(event) {
    this.activeIndex = await this.slide.getActiveIndex();
    this.lasIndex = await this.slide.length();
    if (this.betting == false) {
      this.setScore(event);
    } else {
      this.players[this.activeIndex].bet = event
    }
    if (this.activeIndex == this.lasIndex - 1) {
      this.betting = !this.betting;
      this.changingState();
      this.slide.slideTo(0);
      this.nextRound();
    } else {
      this.activeIndex++;
      await this.sleep(500);
      this.slide.slideTo(this.activeIndex);
    }
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async setScore(playingScore: number) {
    //TODO: ARREGLA ESTA MIERDA JODIO MATADO
    this.slide.getActiveIndex().then(async i => {

      if (this.players[i].bet == 0) {

        if (this.players[i].bet == playingScore) {

          this.players[i].score += this.round * 10;
        } else {
          this.players[i].score -= this.round * (10);
        }
      } else {

        if (this.players[i].bet == playingScore) {

          this.players[i].score += (playingScore * 20) //"add extra"
        } else {

          this.players[i].score -= Math.abs((this.players[i].bet - playingScore)) * 10
        }
      }
      this.debug = "reinicio";
      await this.sleep(1000);
      this.players[i].bet = 0;
      this.players[i].roundScore = 0;
    })
  }

  actualIndex() {
    this.slide.getActiveIndex().then(i => {
      this.slideIndex = i;
    });
  }

  nextRound() {
    if (this.betting == true) {
      this.rounds.push(this.rounds[this.rounds.length - 1] + 1);
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


}
