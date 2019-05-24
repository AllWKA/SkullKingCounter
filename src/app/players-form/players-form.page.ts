import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-players-form',
  templateUrl: `./players-form.page.html`,
  styleUrls: ['./players-form.page.scss'],
})
export class PlayersFormPage implements OnInit {
  @ViewChild("playerSlides") playerSlides: IonSlides;
  constructor(private navCtrl: NavController, private storage: Storage) { }
  players = []
  debug = "none"

  ngOnInit() {

    this.storage.get('numPlayers').then(async (numPlayers) => {

      await new Promise((res, rej) => {
        for (let i = 0; i < numPlayers; i++) {
          this.players[i] = { name: "", score: 0, bet: 0, roundScore: 0, extraRoundScore: 0 }
        }
      });

    });

  }

  savePlayers() {
    var len = document.getElementsByTagName("ion-input").length;
    for (let i = 0; i < len; i++) {
      this.players[i].name = document.getElementsByTagName("ion-input").item(i).value;
      this.debug += "-" + JSON.stringify(this.players[i]);
    }
    this.storage.set("players", this.players);
    this.navCtrl.navigateRoot('playing-page');
  }

}
