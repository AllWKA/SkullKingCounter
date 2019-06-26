import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { IonSlides, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-playing-page',
  templateUrl: './playing-page.page.html',
  styleUrls: ['./playing-page.page.scss'],
})
export class PlayingPagePage implements OnInit {
  players = []
  round = 1;
  betting = true;
  state = "Betting";
  slideIndex;
  rounds = [0, 1];
  activeIndex = 0;
  lasIndex = 1;
  playingound = new Audio();
  imgCode = "../../assets/icon/icon1.jpeg";

  constructor(private storage: Storage, private alertController: AlertController) { }

  ngOnInit() {
    this.playingound.src = "../assets/sounds/playing.mp3";
    this.playingound.load();
    this.playingound.play();
    this.storage.get('players').then(async (players) => {
      this.players = players
    });
  }


  @ViewChild(IonSlides) slide: IonSlides;


  async changePlayer(event) {

    this.activeIndex = await this.slide.getActiveIndex();
    this.lasIndex = await this.slide.length();
    this.checkPoint(event);
  }

  async checkPoint(score) {
    if (this.betting == false) {
      this.setScore(score);
    } else {
      this.players[this.activeIndex].bet = score
      this.slideTo();
    }
  }

  async slideTo() {
    if (this.activeIndex == this.lasIndex - 1) {
      this.betting = !this.betting;
      this.changingState();
      await this.sleep(1000);
      this.slide.slideTo(0);
      this.nextRound();
    } else {
      this.activeIndex++;
      await this.sleep(1000);
      this.slide.slideTo(this.activeIndex);
    }
  }

  async showAlert(header, subHeader, message) {
    let alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: "<p class='alert'> " + message + " </p>"
    });
    alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 1000);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async setScore(playingScore: number) {
    this.slide.getActiveIndex().then(async i => {

      if (this.players[i].bet == 0) {

        if (this.players[i].bet == playingScore) {

          this.players[i].score += this.round * 10;
          this.playSound("coin");
        } else {
          this.players[i].score -= this.round * (10);
        }
      } else {

        if (this.players[i].bet == playingScore) {

          this.players[i].score += (playingScore * 20) //"add extra"
          this.playSound("coin");
        } else {

          this.players[i].score -= Math.abs((this.players[i].bet - playingScore)) * 10
        }
      }
      this.slideTo();
      this.players[i].bet = 0;
      this.players[i].roundScore = 0;
    })
  }

  playSound(sound) {
    let audio = new Audio();
    switch (sound) {
      case "coin":
        audio.src = "../assets/sounds/coin.wav";
        audio.volume = 0.5;
        audio.load();
        audio.play();
        break;
    }
  }

  actualIndex() {
    this.slide.getActiveIndex().then(i => {
      this.slideIndex = i;
    });
  }

  nextRound() {
    if (this.betting == true) {
      this.showAlert("ronda: " + (this.round + 1), "", "");
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
    this.playSound("coin");
    this.slide.getActiveIndex().then(i => {
      if (this.betting) {
        this.players[i].bet++;
      } else {
        this.players[i].roundScore++;
      }
    })
  }


}
