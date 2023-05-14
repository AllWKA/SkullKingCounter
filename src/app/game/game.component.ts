import {Component, OnInit} from '@angular/core';
import {Player, RoundPlay} from "../../global.types";
import {KeyValuePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {ConfigService} from "../config.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [
    NgForOf,
    IonicModule,
    NgClass,
    NgIf,
    FormsModule,
    KeyValuePipe
  ],
  standalone: true
})
export class GameComponent implements OnInit {

  round = 1

  players: Array<Player> = []

  currentPlayerShown = 0

  winner: Player | null = null

  showWinnerModal = false

  showScoreTable = false

  showExitConfirm = false

  rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  audio = new Audio()

  constructor(private router: Router, private config: ConfigService) {
    this.players = config.players
  }

  ngOnInit() {
    this.audio.src = "/assets/sounds/menu.mp3"

    this.audio.load()

    this.audio.play()
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
      let newScore = 0

      if (player.bet > 0) {

        if (player.bet === player.roundsWon) {
          newScore += player.bet * 20
        } else {
          newScore -= Math.abs(player.bet - player.roundsWon) * 10
        }

      } else {

        if (player.bet === player.roundsWon) {
          newScore += this.round * 10
        } else {
          newScore -= this.round * 10
        }

      }

      if (player.bet === player.roundsWon) {
        newScore += player.extraPoints
      }

      player.totalScore += newScore + player.extraPoints

      const roundPlay: RoundPlay = {
        bet: player.bet,
        won: player.roundsWon,
        extra: player.extraPoints,
        roundPoints: player.totalScore
      }

      player.scoreRound.set(this.round, roundPlay)

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

    } else {
      this.round++
    }
  }

  navigateToMainMenu() {
    this.config.reset()

    this.showExitConfirm = false

    this.router.navigate(['/'])
  }
}
