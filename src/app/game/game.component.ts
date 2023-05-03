import {Component, OnInit} from '@angular/core';
import {Player} from "../../global.types";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ConfigService} from "../config.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [
    NgForOf,
    IonicModule,
    NgClass,
    NgIf,
    FormsModule
  ],
  standalone: true
})
export class GameComponent implements OnInit {

  round = 1

  players: Array<Player> = []

  currentPlayerShown = 0

  winner: Player | null = null;

  showWinnerModal = false

  constructor(private config: ConfigService) {
    this.players = config.players
  }

  ngOnInit() {
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

  showPlayer(index: number) {
    return this.currentPlayerShown === index
  }

  passRound() {
    for (const player of this.players) {
      if (player.bet > 0) {
        if (player.bet === player.roundsWon) {
          player.totalScore += player.bet * 20
        } else {
          player.totalScore -= Math.abs(player.bet - player.roundsWon) * 10
        }
      } else {
        if (player.bet === player.roundsWon) {
          player.totalScore += this.round * 10
        } else {
          player.totalScore -= this.round * 10
        }
      }

      if (player.bet === player.roundsWon) {
        player.totalScore += player.extraPoints
      }

      player.bet = 0
      player.roundsWon = 0
      player.extraPoints = 0
    }

    if (this.round === 10) {
      console.log('show winner and results')

      this.players = this.players.sort((player1, player2) => {
        if (player1.totalScore > player2.totalScore) {
          return -1
        }

        return 1
      })

      this.winner = this.players[0]

      this.showWinnerModal = true

      console.log('winner:' + this.winner.name)

      console.log(this.players)

    } else {
      this.round++
    }
  }
}
