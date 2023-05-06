import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {NgClass, NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router'
import {Player} from "../../global.types";
import {ConfigService} from "../config.service";


@Component({
  selector: 'app-playersForm',
  standalone: true,
  templateUrl: './players.form.component.html',
  styleUrls: ['./players.form.component.scss'],
  imports: [IonicModule, NgForOf, NgClass]
})
export class PlayersFormComponent implements OnInit {

  skulls = ['skull', 'skull-black&white', 'skull-bluelight']

  players: Array<Player> = []

  currentPlayerShown = 0

  audio = new Audio()

  constructor(private route: ActivatedRoute, private config: ConfigService, private router: Router) {
    const players = this.config.numPlayers

    for (let player = 0; player < players; player++) {
      const newPlayer = {
        name: '',
        skin: 'skull',
        bet: 0,
        totalScore: 0,
        extraPoints: 0,
        roundsWon: 0
      }

      this.players.push(newPlayer)
    }
  }

  ngOnInit() {
    this.audio.src = "/assets/sounds/menu.mp3"

    this.audio.load()

    this.audio.play()
  }

  changeSkullPath(event: any, index: number) {
    this.players[index].skin = event.target.value.trim()
  }

  setPlayerName(event: any, index: number) {
    this.players[index].name = event.target.value.trim()
  }

  showPlayer(index: number) {
    return this.currentPlayerShown === index
  }

  nextPlayer() {
    let currentPlayer = this.currentPlayerShown

    currentPlayer++

    if (currentPlayer > this.players.length - 1) {
      this.currentPlayerShown = 0
    } else {
      this.currentPlayerShown = currentPlayer
    }
  }

  prevPlayer() {
    let currentPlayer = this.currentPlayerShown

    currentPlayer--

    if (currentPlayer < 0) {
      this.currentPlayerShown = (this.players.length - 1)
    } else {
      this.currentPlayerShown = currentPlayer
    }
  }

  continue() {
    this.config.players = this.players

    this.audio.pause()

    this.router.navigate(['game'])
  }
}
