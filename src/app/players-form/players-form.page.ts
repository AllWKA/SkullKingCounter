import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-players-form',
  templateUrl: `./players-form.page.html`,
  styleUrls: ['./players-form.page.scss'],
})
export class PlayersFormPage implements OnInit {
  @ViewChild("playerSlides") playerSlides: IonSlides;
  constructor(private storage: Storage) { }

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
    // for (let i = 0; i < this.players.length; i++) {
    //   document.getElementById("playerSlides").innerHTML += "<ion-slide style='height: 500px;'>< ion - slides ><ion-slide ><h1>img 1 < /h1>< /ion-slide>< ion - slide ><h1>img 2 < /h1>< /ion-slide>< ion - slide ><h1>img 3 < /h1>< /ion-slide>< /ion-slides></ion-slide>"
    // }
  }

}
